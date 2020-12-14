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
use TYPO3\CMS\FilelistNg\Backend\Service\FolderTreeGeneratorInterface;
use TYPO3\CMS\FilelistNg\Backend\Storage\StorageProviderInterface;

class FolderTreeController
{
    /** @var StorageProviderInterface */
    private $storageProvider;

    /** @var FolderTreeGeneratorInterface */
    private $folderTreeGenerator;

    public function __construct(
        StorageProviderInterface $storageProvider,
        FolderTreeGeneratorInterface $folderTreeGenerator
    ) {
        $this->storageProvider = $storageProvider;
        $this->folderTreeGenerator = $folderTreeGenerator;
    }

    public function fetchDataAction(ServerRequestInterface $request): ResponseInterface
    {
        $storageId = $request->getQueryParams()['uid'] ?? null;

        if (null === $storageId) {
            return new HtmlResponse('Parameter "uid" is missing', 400);
        }

        $storage = $this->storageProvider->getStorageForUserById((int) $storageId);

        if (null === $storage) {
            return new HtmlResponse(\sprintf('Storage "%s" could not be found', $storageId), 404);
        }

        $nodes = $this->folderTreeGenerator->getNodes($storage);

        return new JsonResponse($nodes);
    }
}
