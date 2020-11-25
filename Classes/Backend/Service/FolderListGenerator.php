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

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\Exception\InsufficientFolderAccessPermissionsException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\FolderInterface;
use TYPO3\CMS\Core\Resource\ResourceInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FolderListGenerator
{
    /** @var LanguageService */
    private $languageService;

    /** @var IconFactory */
    private $iconFactory;

    /** @var UriBuilder */
    private $uriBuilder;

    /** @var FileReferencesProviderInterface */
    private $fileReferencesProvider;

    public function __construct(
        LanguageServiceProvider $languageServiceProvider,
        IconFactory $iconFactory,
        UriBuilder $uriBuilder,
        FileReferencesProviderInterface $fileReferencesProvider
    ) {
        $this->languageService = $languageServiceProvider->getLanguageService();
        $this->iconFactory = $iconFactory;
        $this->uriBuilder = $uriBuilder;
        $this->fileReferencesProvider = $fileReferencesProvider;
    }

    public function getFolderItems(Folder $folderObject): array
    {
        $storage = $folderObject->getStorage();

        $folders = \array_filter($storage->getFoldersInFolder($folderObject), static function (Folder $folder) {
            return FolderInterface::ROLE_PROCESSING !== $folder->getRole();
        });

        $folderItems = \array_map([$this, 'formatFolder'], $folders);

        $fileReferences = $this->fileReferencesProvider->getFileReferencesForFolderFiles($folderObject);
        $fileItems = \array_map(function (File $file) use ($fileReferences) {
            return $this->formatFile($file, $fileReferences);
        }, $folderObject->getFiles());

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

        return \array_merge(
            $this->formatResource($folder),
            [
                'size' => $numFiles . ' ' . $this->languageService->getLL(1 === $numFiles ? 'file' : 'files'),
                'type' => $this->languageService->getLL('folder'),
            ]
        );
    }

    /**
     * @return array[string]string
     */
    protected function formatFile(File $file, array $fileReferences = []): array
    {
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

        return \array_merge(
            $this->formatResource($file),
            [
                'size' => GeneralUtility::formatSize((int) $file->getSize(), $this->languageService->getLL('byteSizeUnits')),
                'type' => \strtoupper($file->getExtension()),
                'references' => $fileReferences[$file->getUid()] ?? '-',
                'thumbnailUrl' => $thumbnailUrl,
                'thumbnailWidth' => $thumbnailWidth,
            ]
        );
    }

    /**
     * @return array[string]string
     */
    protected function formatResource(ResourceInterface $resource): array
    {
        $combinedIdentifier = $resource->getCombinedIdentifier();
        $icon = $this->iconFactory->getIconForResource($resource, Icon::SIZE_SMALL);
        $isWritable = $resource->checkActionPermission('write');
        $clipboardIdentifier = GeneralUtility::shortMD5($combinedIdentifier);

        return [
            'identifier' => $combinedIdentifier,
            'icon' => $icon->getMarkup(),
            'name' => $resource->getName(),
            'modified' => BackendUtility::date($resource->getModificationTime()),
            //todo detect variants
            'variants' => '-',
            'references' => '-',
            'rw' => $this->languageService->getLL('read') . ($isWritable ? $this->languageService->getLL('write') : ''),
            'contextMenuUrl' => $this->buildContextMenuUrl($combinedIdentifier),
            'clipboardIdentifier' => $clipboardIdentifier,
        ];
    }

    protected function buildContextMenuUrl(string $combinedIdentifier): string
    {
        return (string) $this->uriBuilder->buildUriFromRoute('ajax_contextmenu', ['table' => 'sys_file', 'uid' => $combinedIdentifier]);
    }
}
