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
use TYPO3\CMS\Core\Database\ConnectionPool;
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

    /** @var UriBuilder */
    private $uriBuilder;
    /** @var ConnectionPool */
    private $connectionPool;

    public function __construct(
        LanguageServiceProvider $languageServiceProvider,
        IconFactory $iconFactory,
        UriBuilder $uriBuilder,
        ConnectionPool $connectionPool
    ) {
        $this->languageService = $languageServiceProvider->getLanguageService();
        $this->iconFactory = $iconFactory;
        $this->uriBuilder = $uriBuilder;
        $this->connectionPool = $connectionPool;
    }

    public function getFolderItems(Folder $folderObject): array
    {
        $storage = $folderObject->getStorage();

        $folders = \array_filter($storage->getFoldersInFolder($folderObject), static function (Folder $folder) {
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
        $combinedIdentifier = $folder->getCombinedIdentifier();

        return [
            'uid' => $combinedIdentifier,
            'icon' => $icon->getMarkup(),
            'name' => $folder->getName(),
            'modified' => BackendUtility::date($folder->getModificationTime()),
            'size' => $numFiles . ' ' . $this->languageService->getLL(1 === $numFiles ? 'file' : 'files'),
            'type' => $this->languageService->getLL('folder'),
            //todo detect variants & references
            'variants' => '-',
            'references' => '-',
            'rw' => $this->languageService->getLL('read') . ($isWritable ? $this->languageService->getLL('write') : ''),
            'contextMenuUrl' => $this->buildContextMenuUrl($combinedIdentifier),
        ];
    }

    /**
     * @return array[string]string
     */
    protected function formatFile(File $file): array
    {
        $icon = $this->iconFactory->getIconForResource($file, Icon::SIZE_SMALL);
        $isWritable = $file->checkActionPermission('write');
        $combinedIdentifier = $file->getCombinedIdentifier();

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
            'uid' => $combinedIdentifier,
            'icon' => $icon->getMarkup(),
            'name' => $file->getName(),
            'modified' => BackendUtility::date($file->getModificationTime()),
            'size' => GeneralUtility::formatSize((int) $file->getSize(), $this->languageService->getLL('byteSizeUnits')),
            'type' => \strtoupper($file->getExtension()),
            //todo detect variants & references
            'variants' => '-',
            'references' => $this->getReferences($file),
            'rw' => $this->languageService->getLL('read') . ($isWritable ? $this->languageService->getLL('write') : ''),
            'thumbnailUrl' => $thumbnailUrl,
            'thumbnailWidth' => $thumbnailWidth,
            'contextMenuUrl' => $this->buildContextMenuUrl($combinedIdentifier),
        ];
    }

    protected function buildContextMenuUrl(string $combinedIdentifier): string
    {
        return (string) $this->uriBuilder->buildUriFromRoute('ajax_contextmenu', ['table' => 'sys_file', 'uid' => $combinedIdentifier]);
    }

    protected function getReferences(File $file): string
    {
        // todo calculate references for all files in one query.....
        $queryBuilder = $this->connectionPool->getQueryBuilderForTable('sys_refindex');

        $referenceCount = $queryBuilder->count('*')
            ->from('sys_refindex')
            ->where(
                $queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, \PDO::PARAM_INT)),
                $queryBuilder->expr()->eq(
                    'ref_table',
                    $queryBuilder->createNamedParameter('sys_file', \PDO::PARAM_STR)
                ),
                $queryBuilder->expr()->eq(
                    'ref_uid',
                    $queryBuilder->createNamedParameter($file->getUid(), \PDO::PARAM_INT)
                ),
                $queryBuilder->expr()->neq(
                    'tablename',
                    $queryBuilder->createNamedParameter('sys_file_metadata', \PDO::PARAM_STR)
                )
            )
            ->execute()
            ->fetchColumn();

        return $referenceCount === 0 ? '-' : (string) $referenceCount;
    }
}
