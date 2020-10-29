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
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Resource\Exception\InsufficientFolderAccessPermissionsException;
use TYPO3\CMS\Core\Resource\FolderInterface;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\FilelistNg\Backend\Service\LanguageServiceProvider;

class FolderDetailController
{
    /** @var ResourceFactory */
    private $resourceFactory;

    /** @var \TYPO3\CMS\Core\Localization\LanguageService */
    private $languageService;

    /** @var IconFactory */
    private $iconFactory;

    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    public function __construct(
        LanguageServiceProvider $languageServiceProvider,
        ResourceFactory $resourceFactory,
        IconFactory $iconFactory
    ) {
        $this->resourceFactory = $resourceFactory;
        $this->languageService = $languageServiceProvider->getLanguageService();
        $this->iconFactory = $iconFactory;
        $this->languageServiceProvider = $languageServiceProvider;
    }

    public function fetchDataAction(ServerRequestInterface $request): ResponseInterface
    {
        $combinedIdentifier = $request->getQueryParams()['id'] ?? null;

        if (null === $combinedIdentifier) {
            return new HtmlResponse('Parameter "id" is missing', 400);
        }

        $storage = $this->resourceFactory->getStorageObjectFromCombinedIdentifier($combinedIdentifier);

        $folderId = \substr($combinedIdentifier, \strpos($combinedIdentifier, ':') + 1);

        if (!$storage->hasFolder($folderId)) {
            return new HtmlResponse(\sprintf('Folder "%s" is missing', $folderId), 400);
        }

        if (0 === $storage->getUid()) {
            throw new InsufficientFolderAccessPermissionsException(
                'You are not allowed to access files outside your storages',
                1603901426
            );
        }

        $folderObject = $this->resourceFactory->getFolderObjectFromCombinedIdentifier($combinedIdentifier);

        $folders = $storage->getFoldersInFolder($folderObject);
        $files = $folderObject->getFiles();

        $test1 = $this->languageService->getLL('folder');
        $test2 = $this->languageServiceProvider->getLanguageService()->getLL('folder');

        $items = [];

        foreach ($folders as $folder) {
            if (FolderInterface::ROLE_PROCESSING === $folder->getRole()) {
                // don't show processing-folder
                continue;
            }
            try {
                $numFiles = $folder->getFileCount();
            } catch (InsufficientFolderAccessPermissionsException $e) {
                $numFiles = 0;
            }

            $icon = $this->iconFactory->getIconForResource($folder, Icon::SIZE_SMALL);
            $isWritable = $folderObject->checkActionPermission('write');

            $items[] = [
                'id' => $folder->getCombinedIdentifier(),
                'icon' => $icon->getMarkup(),
                'name' => $folder->getName(),
                'modified' => BackendUtility::date($folder->getModificationTime()),
                'size' => $numFiles . ' ' . $this->languageService->getLL(1 === $numFiles ? 'file' : 'files'),
                'type' => $this->languageService->getLL('folder'),
                //todo detect variants & references
                'variants' => '-',
                'references' => '0',
                'rw' => $this->languageService->getLL('read') . ($isWritable ? $this->languageService->getLL('write') : ''),
            ];
        }

        foreach ($files as $file) {
            $icon = $this->iconFactory->getIconForResource($file, Icon::SIZE_SMALL);

            $items[] = [
                'id' => $file->getCombinedIdentifier(),
                'icon' => $icon->getMarkup(),
                'name' => $file->getName(),
                'modified' => BackendUtility::date($file->getModificationTime()),
                'size' => GeneralUtility::formatSize((int) $file->getSize(), $this->languageService->getLL('byteSizeUnits')),
                'type' => \strtoupper($file->getExtension()),
                //todo detect variants & references
                'variants' => '-',
                'references' => '0',
                'rw' => 'r' . $folderObject->checkActionPermission('write') ? 'w' : '',
            ];
        }
        return new JsonResponse($items);
    }
}
