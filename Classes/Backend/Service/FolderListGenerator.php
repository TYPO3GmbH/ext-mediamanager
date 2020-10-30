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
use TYPO3\CMS\Core\Resource\File;
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
        $storage = $folderObject->getStorage();

        $folders = \array_filter($storage->getFoldersInFolder($folderObject), function (Folder $folder) {
            return FolderInterface::ROLE_PROCESSING !== $folder->getRole();
        });

        $folderItems = \array_map([$this, 'formatFolder'], $folders);
        $fileItems = \array_map([$this, 'formatFile'], $folderObject->getFiles());

        return \array_merge(\array_values($folderItems), \array_values($fileItems));
    }

    /**
     * @return array[string]string
     */
    protected function formatFolder(Folder $folder): array
    {
        try {
            $numFiles = $folder->getFileCount();
        } catch (InsufficientFolderAccessPermissionsException $e) {
            $numFiles = 0;
        }

        $icon = $this->iconFactory->getIconForResource($folder, Icon::SIZE_SMALL);
        $isWritable = $folder->checkActionPermission('write');

        return [
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

    /**
     * @return array[string]string
     */
    protected function formatFile(File $file): array
    {
        $icon = $this->iconFactory->getIconForResource($file, Icon::SIZE_SMALL);
        $isWritable = $file->checkActionPermission('write');

        $thumbnailUrl = null;
        $thumbnailWidth = 190;
        if ($file->isImage() || $file->isMediaFile()) {
            $thumbnailHeight = 200;
            if ($file->getProperty('width') > 0 && $file->getProperty('height') > 0) {
                $aspectRatio = $file->getProperty('width') / $file->getProperty('height');
                $thumbnailWidth = (int) (300 * $aspectRatio);
            }
            $thumbnailUrl = BackendUtility::getThumbnailUrl($file->getUid(), ['height' => $thumbnailHeight, 'width' => $thumbnailWidth]);
        }

        return [
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
            'thumbnailUrl' => $thumbnailUrl,
            'thumbnailWidth' => $thumbnailWidth
        ];
    }
}
