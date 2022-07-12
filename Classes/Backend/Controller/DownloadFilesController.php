<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace TYPO3\CMS\Mediamanager\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Http\RedirectResponse;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3\CMS\Mediamanager\Backend\Service\ArchiveGeneratorInterface;
use TYPO3\CMS\Mediamanager\Backend\Validator\DownloadSizeValidatorFactoryInterface;

class DownloadFilesController
{
    /** @var ResourceFactory */
    private $resourceFactory;

    /** @var ArchiveGeneratorInterface */
    private $archiveGenerator;

    /** @var DownloadSizeValidatorFactoryInterface */
    private $downloadSizeValidatorFactory;

    public function __construct(
        ResourceFactory $resourceFactory,
        ArchiveGeneratorInterface $archiveGenerator,
        DownloadSizeValidatorFactoryInterface $downloadSizeValidatorFactory
    ) {
        $this->resourceFactory = $resourceFactory;
        $this->archiveGenerator = $archiveGenerator;
        $this->downloadSizeValidatorFactory = $downloadSizeValidatorFactory;
    }

    public function downloadAction(ServerRequestInterface $request): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        $identifiers = $parsedBody['identifiers'] ?? [];

        if (\count($identifiers) === 0) {
            return new HtmlResponse('Parameter "identifiers" is missing or empty', 400);
        }

        // handle single file: no zip required
        if (\count($identifiers) === 1) {
            $identifier = \current($identifiers);
            $fileOrFolderObject = $this->resourceFactory->retrieveFileOrFolderObject($identifier);

            if ($fileOrFolderObject instanceof File) {
                if ($fileOrFolderObject->checkActionPermission('read') === false) {
                    return new HtmlResponse('Missing read permissions  for ' . $fileOrFolderObject->getName(), 403);
                }
                return new RedirectResponse(
                    PathUtility::getAbsoluteWebPath($fileOrFolderObject->getPublicUrl())
                );
            }
        }

        $resources = \array_map(function (string $identifier) {
            return $this->resourceFactory->retrieveFileOrFolderObject($identifier);
        }, $identifiers);

        $resourceSizeValidator = $this->downloadSizeValidatorFactory->createValidator();
        $validationResult = $resourceSizeValidator->validate($resources);

        if ($validationResult->hasErrors() === true) {
            return new HtmlResponse($validationResult->getFirstError()->getMessage(), 400);
        }

        try {
            $archiveFilePath = $this->archiveGenerator->generateArchive($resources);
            $stream = @\fopen($archiveFilePath, 'rb');

            return new Response(
                $stream,
                200,
                [
                    'Content-Type' => 'application/zip',
                    'Content-Disposition' => 'attachment;filename="' . 'download.zip' . '"',
                ]
            );
        } catch (\Throwable $e) {
            return new HtmlResponse('An error occurred while downloading files ' . $e->getMessage(), 500);
        }
    }
}
