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
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\Service\FolderTreeGenerator;

class FolderTreeController
{
    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var FolderTreeGenerator */
    private $folderTreeGenerator;

    public function __construct(BackendUserProvider $backendUserProvider, FolderTreeGenerator $folderTreeGenerator)
    {
        $this->backendUserProvider = $backendUserProvider;
        $this->folderTreeGenerator = $folderTreeGenerator;
    }

    public function fetchDataAction(ServerRequestInterface $request): ResponseInterface
    {
        $storageId = $request->getQueryParams()['storageId'] ?? null;

        if (null === $storageId) {
            return new HtmlResponse('Parameter "storageId" is missing', 400);
        }

        $storages = $this->backendUserProvider->getBackendUser()->getFileStorages();
        $filteredStorages = \array_filter($storages, static function ($storage) use ($storageId) {
            return $storage->getUid() === (int) $storageId;
        });

        if (1 !== \count($filteredStorages)) {
            return new HtmlResponse(\sprintf('Storage "%s" could not be found', $storageId), 404);
        }

        $nodes = $this->folderTreeGenerator->getNodes(\current($filteredStorages));
        return new JsonResponse($nodes);
    }
}
