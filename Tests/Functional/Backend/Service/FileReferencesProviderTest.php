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

namespace Functional\Backend\Service;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\FolderInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\FilelistNg\Backend\Service\FileReferencesProvider;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class FileReferencesProviderTest extends FunctionalTestCase
{
    /** @var FileReferencesProvider */
    private $subject;

    protected $testExtensionsToLoad = [
        'typo3conf/ext/cms_filelist_ng',
    ];

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = new FileReferencesProvider(GeneralUtility::makeInstance(ConnectionPool::class));
        $this->importCSVDataSet(__DIR__ . '/../../DataSet/SysRefindex.csv');
    }

    /**
     * @test
     */
    public function it_can_return_file_references(): void
    {
        /** @var FolderInterface $folder */
        $folder = $this->createMock(Folder::class);

        $fileA = $this->createMock(File::class);
        $fileA->method('getUid')->willReturn(1);

        $fileB = $this->createMock(File::class);
        $fileB->method('getUid')->willReturn(2);

        $fileC = $this->createMock(File::class);
        $fileC->method('getUid')->willReturn(3);

        $folder->method('getFiles')
            ->willReturn([$fileA, $fileB, $fileC]);

        $references = $this->subject->getFileReferencesForFolderFiles($folder);

        $this->assertEquals([
            1 => 2,
            3 => 1,
        ], $references);
    }
}
