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

namespace TYPO3\CMS\Mediamanager\Backend\Service;

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\InaccessibleFolder;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Resource\Utility\ListUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FolderTreeGenerator implements FolderTreeGeneratorInterface
{
    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var array */
    public $specUIDmap = [];

    /** @var array */
    public $stored = [];

    /** @var IconFactory */
    private $iconFactory;

    /** @var LanguageService */
    private $languageService;

    /** @var UriBuilder */
    private $uriBuilder;

    /** @var IconUrlProviderInterface */
    private $iconUrlProvider;

    public function __construct(
        BackendUserProvider $backendUserProvider,
        LanguageServiceProvider $languageServiceProvider,
        IconFactory $iconFactory,
        UriBuilder $uriBuilder,
        IconUrlProviderInterface $iconUrlProvider
    ) {
        $this->backendUserProvider = $backendUserProvider;
        $this->iconFactory = $iconFactory;
        $this->languageService = $languageServiceProvider->getLanguageService();
        $this->uriBuilder = $uriBuilder;
        $this->iconUrlProvider = $iconUrlProvider;
    }

    public function getNodes(ResourceStorage $resourceStorage): array
    {
        $rootLevelFolders = $this->getRootLevelFolders($resourceStorage);
        $items = [];
        $depth = 0;
        foreach ($rootLevelFolders as $i => $rootLevelFolderInfo) {
            /** @var Folder $rootLevelFolder */
            $rootLevelFolder = $rootLevelFolderInfo['folder'];
            $rootLevelFolderName = $rootLevelFolderInfo['name'];
            $combinedIdentifier = $rootLevelFolder->getCombinedIdentifier();
            $folderHashSpecUID = GeneralUtility::md5int($combinedIdentifier);
            $stateIdentifier = $rootLevelFolder->getStorage()->getUid() . '_' . $folderHashSpecUID;
            $this->specUIDmap[$folderHashSpecUID] = $combinedIdentifier;

            if (false === $resourceStorage->isOnline()) {
                $rootLevelFolderName .= ' (' . $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_file.xlf:sys_file_storage.isOffline') . ')';
            }

            $items[] = \array_merge(
                $this->formatFolder($rootLevelFolder, true),
                [
                    'name' => $rootLevelFolderName,
                    'stateIdentifier' => $stateIdentifier,
                    'depth' => $depth,
                    'siblingsCount' => \count($rootLevelFolders) - 1,
                    'siblingsPosition' => $i,
                ]
            );

            // If the mount is expanded, go down:
            if ($resourceStorage->isBrowsable()) {
                $childItems = $this->getFolderTree($rootLevelFolder, $depth + 1);
                \array_push($items, ...$childItems);
            }
        }
        return $items;
    }

    protected function getFolderTree(Folder $folderObject, $depth = 999, $type = '')
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
            $combinedIdentifier = $subFolder->getCombinedIdentifier();
            $specUID = GeneralUtility::md5int($combinedIdentifier);
            $this->specUIDmap[$specUID] = $combinedIdentifier;

            $folderHashSpecUID = GeneralUtility::md5int($combinedIdentifier);
            $stateIdentifier = $subFolder->getStorage()->getUid() . '_' . $folderHashSpecUID;

            $items[] = \array_merge(
                $this->formatFolder($subFolder),
                [
                    'stateIdentifier' => $stateIdentifier,
                    'depth' => $depth,
                    'siblingsCount' => \count($subFolders) - 1,
                    'siblingsPosition' => $subFolderCounter + 1,
                ]
            );

            if (\count($subFolder->getSubfolders()) > 0) {
                $childItems = $this->getFolderTree($subFolder, $depth + 1);
                \array_push($items, ...$childItems);
            }
        }
        return $items;
    }

    /**
     * @return array[string]string
     */
    protected function formatFolder(Folder $folder, bool $isStorage = false): array
    {
        $combinedIdentifier = $folder->getCombinedIdentifier();

        $icon = $this->iconFactory->getIconForResource(
            $folder,
            Icon::SIZE_SMALL,
            null,
            $isStorage ? ['mount-root' => true] : []
        );

        $clipboardIdentifier = substr(md5($combinedIdentifier), 0, 10);
        $parentFolder = $folder->getParentFolder();

        return [
            'identifier' => $combinedIdentifier,
            'icon' => $this->iconUrlProvider->getUrl($icon),
            'overlayIcon' => $this->iconUrlProvider->getUrl($icon->getOverlayIcon()),
            'name' => $folder->getName(),
            'nameSourceField' => 'title',
            'hasChildren' => \count($folder->getSubfolders()) > 0,
            'folderUrl' => $this->buildFolderUrl($combinedIdentifier),
            'allowEdit' => $folder->checkActionPermission('rename'),
            'clipboardIdentifier' => $clipboardIdentifier,
            'parentIdentifier' => $parentFolder instanceof Folder && !$isStorage ? $parentFolder->getCombinedIdentifier() : null,
            'sysType' => '_FOLDER',
            'contextMenuType' => 'sys_file',
        ];
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

    protected function buildFolderUrl(string $combinedIdentifier): string
    {
        return (string)$this->uriBuilder->buildUriFromRoute('ajax_mediamanager_folder_fetchData', ['identifier' => $combinedIdentifier]);
    }
}
