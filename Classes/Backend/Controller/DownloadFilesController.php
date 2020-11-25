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

namespace TYPO3\CMS\FilelistNg\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;

class DownloadFilesController
{
    /** @var ResourceFactory */
    private $resourceFactory;

    public function __construct(ResourceFactory $resourceFactory)
    {
        $this->resourceFactory = $resourceFactory;
    }

    public function downloadAction(ServerRequestInterface $request): ResponseInterface
    {
        $parsedBody = $request->getParsedBody();

        $identifiers = $parsedBody['identifiers'] ?? [];

        if (0 === \count($identifiers)) {
            return new HtmlResponse('Parameter "identifiers" is missing or empty', 400);
        }

        // handle single file: no zip required
        if (1 === \count($identifiers)) {
            $identifier = \current($identifiers);
            $fileOrFolderObject = $this->resourceFactory->retrieveFileOrFolderObject($identifier);

            if ($fileOrFolderObject instanceof File) {
                return new JsonResponse(['url' => $fileOrFolderObject->getPublicUrl()]);
            }
        }
    }
}
