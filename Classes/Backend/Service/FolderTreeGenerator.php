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

use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\InaccessibleFolder;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Resource\Utility\ListUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FolderTreeGenerator
{
    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var array */
    public $specUIDmap = [];

    /** @var array */
    public $stored = [];

    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    /** @var IconFactory */
    private $iconFactory;

    public function __construct(
        BackendUserProvider $backendUserProvider,
        LanguageServiceProvider $languageServiceProvider,
        IconFactory $iconFactory
    ) {
        $this->backendUserProvider = $backendUserProvider;
        $this->languageServiceProvider = $languageServiceProvider;
        $this->iconFactory = $iconFactory;
    }

    public function getNodes(ResourceStorage $resourceStorage): array
    {
        $rootLevelFolders = $this->getRootLevelFolders($resourceStorage);
        $languageService = $this->languageServiceProvider->getLanguageService();

        $items = [];

        $depth = 0;
        foreach ($rootLevelFolders as $i => $rootLevelFolderInfo) {
            /** @var Folder $rootLevelFolder */
            $rootLevelFolder = $rootLevelFolderInfo['folder'];
            $rootLevelFolderName = $rootLevelFolderInfo['name'];
            $folderHashSpecUID = GeneralUtility::md5int($rootLevelFolder->getCombinedIdentifier());
            $stateIdentifier = $rootLevelFolder->getStorage()->getUid() . '_' . $folderHashSpecUID;

            $this->specUIDmap[$folderHashSpecUID] = $rootLevelFolder->getCombinedIdentifier();
            // Hash key
//            $storageHashNumber = $this->getShortHashNumberForStorage($resourceStorage, $rootLevelFolder);
            // Set first:
//            $this->bank = $storageHashNumber;
//            $isOpen = $this->stored[$storageHashNumber][$folderHashSpecUID] || $this->expandFirst;
            $isOpen = true;
            // Set PM icon:
//            $cmd = $this->generateExpandCollapseParameter($this->bank, !$isOpen, $rootLevelFolder);
//            // Only show and link icon if storage is browseable
//            if (!$resourceStorage->isBrowsable() || $this->getNumberOfSubfolders($rootLevelFolder) === 0) {
//                $firstHtml = '';
//            } else {
//                $firstHtml = $this->renderPMIconAndLink($cmd, $isOpen);
//            }
            // Mark a storage which is not online, as offline
            // maybe someday there will be a special icon for this
            if (false === $resourceStorage->isOnline()) {
                $rootLevelFolderName .= ' (' . $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_file.xlf:sys_file_storage.isOffline') . ')';
            }
            // Preparing rootRec for the mount
            $icon = $this->iconFactory->getIconForResource($rootLevelFolder, Icon::SIZE_SMALL, null, ['mount-root' => true]);

            $items[] = [
                'stateIdentifier' => $stateIdentifier,
                'identifier' => $rootLevelFolder->getCombinedIdentifier(),
                'depth' => $depth,
                'icon' => $icon->getIdentifier(),
                'name' => $rootLevelFolderName,
                'nameSourceField' => 'title',
                'siblingsCount' => \count($rootLevelFolders) - 1,
                'siblingsPosition' =>  $i,
                'hasChildren' => \count($rootLevelFolder->getSubfolders()) > 0,
                'expanded' => $isOpen,
            ];

            // If the mount is expanded, go down:
            if ($isOpen && $resourceStorage->isBrowsable()) {
                $childItems = $this->getFolderTree($rootLevelFolder, $depth + 1);
                \array_push($items, ...$childItems);
            }
        }
        return $items;
    }

    public function getFolderTree(Folder $folderObject, $depth = 999, $type = '')
    {
        $items = [];
        // This generates the directory tree
        /* array of \TYPO3\CMS\Core\Resource\Folder */
        if ($folderObject instanceof InaccessibleFolder) {
            $subFolders = [];
        } else {
            $subFolders = $folderObject->getSubfolders();
            $subFolders = ListUtility::resolveSpecialFolderNames($subFolders);
            \uksort($subFolders, 'strnatcasecmp');
        }

        $subFolderCounter = 0;
        /** @var Folder $subFolder */
        foreach ($subFolders as $subFolderName => $subFolder) {
            ++$subFolderCounter;

            $isLocked = $subFolder instanceof InaccessibleFolder;
            $specUID = GeneralUtility::md5int($subFolder->getCombinedIdentifier());
            $this->specUIDmap[$specUID] = $subFolder->getCombinedIdentifier();

            $isOpen = \count($subFolder->getSubfolders()) > 0;

            $icon = $this->iconFactory->getIconForResource($subFolder, Icon::SIZE_SMALL, null, ['folder-open' => (bool) $isOpen]);

            $folderHashSpecUID = GeneralUtility::md5int($subFolder->getCombinedIdentifier());
            $stateIdentifier = $subFolder->getStorage()->getUid() . '_' . $folderHashSpecUID;

            $items[] = [
                'stateIdentifier' => $stateIdentifier,
                'identifier' => $subFolder->getCombinedIdentifier(),
                'depth' => $depth,
                'icon' => $icon->getIdentifier(),
                'name' => $subFolderName,
                'nameSourceField' => 'title',
                'siblingsCount' => \count($subFolders) - 1,
                'siblingsPosition' => $subFolderCounter + 1,
                'hasChildren' => \count($subFolder->getSubfolders()) > 0,
            ];

            if (\count($subFolder->getSubfolders()) > 0) {
                $childItems = $this->getFolderTree($subFolder, $depth + 1);
                \array_push($items, ...$childItems);
            }
        }
        return $items;
    }

    private function getRootLevelFolders(ResourceStorage $resourceStorage): array
    {
        $fileMounts = $resourceStorage->getFileMounts();
        if (!empty($fileMounts)) {
            return \array_map(static function ($fileMountInfo) {
                return [
                    'folder' => $fileMountInfo['folder'],
                    'name' => $fileMountInfo['title'],
                ];
            }, $fileMounts);
        }

        if ($this->backendUserProvider->getBackendUser()->isAdmin()) {
            return [[
                'folder' => $resourceStorage->getRootLevelFolder(),
                'name' => $resourceStorage->getName(),
            ]];
        }

        return [];
    }
}
