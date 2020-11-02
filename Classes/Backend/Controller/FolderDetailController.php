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
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\FilelistNg\Backend\Service\FolderListGenerator;

class FolderDetailController
{
    /** @var ResourceFactory */
    private $resourceFactory;

    /** @var FolderListGenerator */
    private $folderListGenerator;

    public function __construct(
        ResourceFactory $resourceFactory,
        FolderListGenerator $folderListGenerator
    ) {
        $this->resourceFactory = $resourceFactory;
        $this->folderListGenerator = $folderListGenerator;
    }

    public function fetchDataAction(ServerRequestInterface $request): ResponseInterface
    {
        $combinedIdentifier = $request->getQueryParams()['uid'] ?? null;

        if (null === $combinedIdentifier) {
            return new HtmlResponse('Parameter "uid" is missing', 400);
        }

        $storage = $this->resourceFactory->getStorageObjectFromCombinedIdentifier($combinedIdentifier);

        if (null === $storage) {
            return new HtmlResponse(\sprintf('Storage for  "%s" is missing', $combinedIdentifier), 404);
        }

        $folderId = \substr($combinedIdentifier, \strpos($combinedIdentifier, ':') + 1);

        if (false === $storage->hasFolder($folderId)) {
            return new HtmlResponse(\sprintf('Folder "%s" is missing', $folderId), 404);
        }

        if (0 === $storage->getUid()) {
            return new HtmlResponse('You are not allowed to access files outside your storages', 405);
        }

        $folderObject = $this->resourceFactory->getFolderObjectFromCombinedIdentifier($combinedIdentifier);
        $items = $this->folderListGenerator->getFolderItems($folderObject);

        $response = new JsonResponse();
        // use set payload to bypass  if (!empty($data)) check in JsonResponse constructor and return empty array
        $response->setPayload($items);

        return $response;
    }
}
