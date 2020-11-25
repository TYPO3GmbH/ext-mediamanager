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
use TYPO3\CMS\Core\Database\Connection;
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

        $fileReferences = $this->getFileReferences($folderObject);
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

        $icon = $this->iconFactory->getIconForResource($folder, Icon::SIZE_SMALL);
        $isWritable = $folder->checkActionPermission('write');
        $combinedIdentifier = $folder->getCombinedIdentifier();
        $clipboardIdentifier = GeneralUtility::shortMD5($combinedIdentifier);

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
            'clipboardIdentifier' => $clipboardIdentifier,
        ];
    }

    /**
     * @return array[string]string
     */
    protected function formatFile(File $file, array $fileReferences = []): array
    {
        $icon = $this->iconFactory->getIconForResource($file, Icon::SIZE_SMALL);
        $isWritable = $file->checkActionPermission('write');
        $combinedIdentifier = $file->getCombinedIdentifier();
        $clipboardIdentifier = GeneralUtility::shortMD5($combinedIdentifier);

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
            'references' => $fileReferences[$file->getUid()] ?? '-',
            'rw' => $this->languageService->getLL('read') . ($isWritable ? $this->languageService->getLL('write') : ''),
            'thumbnailUrl' => $thumbnailUrl,
            'thumbnailWidth' => $thumbnailWidth,
            'contextMenuUrl' => $this->buildContextMenuUrl($combinedIdentifier),
            'clipboardIdentifier' => $clipboardIdentifier,
        ];
    }

    protected function buildContextMenuUrl(string $combinedIdentifier): string
    {
        return (string) $this->uriBuilder->buildUriFromRoute('ajax_contextmenu', ['table' => 'sys_file', 'uid' => $combinedIdentifier]);
    }

    /**
     * todo use own service for getting references
     *
     * @return array<string, int>
     */
    protected function getFileReferences(Folder $folder): array
    {
        if (0 === \count($folder->getFiles())) {
            return [];
        }

        $fileUids = \array_map(
            static function (File $file) {
                return $file->getUid();
            },
            $folder->getFiles()
        );

        $queryBuilder = $this->connectionPool->getQueryBuilderForTable('sys_refindex');

        $referenceCount = $queryBuilder->select('ref_uid')
            ->addSelectLiteral('COUNT(*) AS cnt_ref')
            ->from('sys_refindex')
            ->where(
                $queryBuilder->expr()->eq('deleted', $queryBuilder->createNamedParameter(0, Connection::PARAM_INT)),
                $queryBuilder->expr()->eq(
                    'ref_table',
                    $queryBuilder->createNamedParameter('sys_file', Connection::PARAM_STR)
                ),
                $queryBuilder->expr()->in(
                    'ref_uid',
                    $queryBuilder->createNamedParameter($fileUids, Connection::PARAM_INT_ARRAY)
                ),
                $queryBuilder->expr()->neq(
                    'tablename',
                    $queryBuilder->createNamedParameter('sys_file_metadata', Connection::PARAM_STR)
                )
            )
            ->groupBy('ref_uid')
            ->execute()
            ->fetchAll();

        return \array_combine(
            \array_column($referenceCount, 'ref_uid'),
            \array_column($referenceCount, 'cnt_ref')
        );
    }
}
