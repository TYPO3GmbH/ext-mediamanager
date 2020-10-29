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

namespace TYPO3\CMS\FilelistNg\Backend\Service;

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\Exception\InsufficientFolderAccessPermissionsException;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\FolderInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FolderListGenerator
{
    /** @var LanguageService */
    private $languageService;

    /** @var IconFactory */
    private $iconFactory;

    public function __construct(
        LanguageServiceProvider $languageServiceProvider,
        IconFactory $iconFactory
    ) {
        $this->languageService = $languageServiceProvider->getLanguageService();
        $this->iconFactory = $iconFactory;
    }

    public function getFolderItems(Folder $folderObject): array
    {
        $items = [];
        $storage = $folderObject->getStorage();

        $folders = $storage->getFoldersInFolder($folderObject);
        $files = $folderObject->getFiles();

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
            $isWritable = $file->checkActionPermission('write');

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
                'rw' => $this->languageService->getLL('read') . ($isWritable ? $this->languageService->getLL('write') : ''),
            ];
        }

        return $items;
    }
}
