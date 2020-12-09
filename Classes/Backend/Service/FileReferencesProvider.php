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

use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Resource\FolderInterface;

class FileReferencesProvider implements FileReferencesProviderInterface
{
    /** @var ConnectionPool */
    private $connectionPool;

    private $cachedReferencesByFolder = [];

    public function __construct(ConnectionPool $connectionPool)
    {
        $this->connectionPool = $connectionPool;
    }

    /**
     * {@inheritdoc}
     */
    public function getReferencesCount(FileInterface $file): int
    {
        $folder = $file->getParentFolder();

        if (!isset($this->cachedReferencesByFolder[$folder->getIdentifier()])) {
            $this->cachedReferencesByFolder[$folder->getIdentifier()] = $this->getReferencesByFolderFromDatabase($folder);
        }

        $folderReferences = $this->cachedReferencesByFolder[$folder->getIdentifier()];

        return $folderReferences[$file->getUid()] ?? 0;
    }

    private function getReferencesByFolderFromDatabase(FolderInterface $folder): array
    {
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
