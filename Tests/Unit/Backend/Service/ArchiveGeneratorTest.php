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

namespace TYPO3\CMS\FilelistNg\Tests\Unit\Backend\Service;

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\FilelistNg\Backend\Service\ArchiveGenerator;
use TYPO3\CMS\FilelistNg\Backend\Service\ArchiveGeneratorInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class ArchiveGeneratorTest extends UnitTestCase
{
    /** @var ArchiveGenerator */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = new ArchiveGenerator();
    }

    /**
     * @test
     */
    public function it_implements_ArchiveGeneratorInterface(): void
    {
        self::assertInstanceOf(ArchiveGeneratorInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_can_return_archive_file(): void
    {
        $rootFolder = $this->createMock(Folder::class);
        $rootFolder->method('getName')
            ->willReturn('root');

        $fileInSubFolder = $this->createMock(File::class);
        $fileInSubFolder->method('getName')
            ->willReturn('fileB.jpg');
        $fileInSubFolder->method('getContents')
            ->willReturn('fileB');

        $subfolder = $this->createMock(Folder::class);
        $subfolder->method('getName')
            ->willReturn('test');
        $subfolder->method('getParentFolder')
            ->willReturn($rootFolder);
        $subfolder->method('getFiles')
            ->willReturn([$fileInSubFolder]);
        $subfolder->method('getSubfolders')
            ->willReturn([]);

        $fileInRootFolder = $this->createMock(File::class);
        $fileInRootFolder->method('getName')
            ->willReturn('fileA.jpg');
        $fileInRootFolder->method('getParentFolder')
            ->willReturn($rootFolder);
        $fileInRootFolder->method('getContents')
            ->willReturn('fileA');

        $filePath = $this->subject->generateArchive([$subfolder, $fileInRootFolder]);
        self::assertIsString($filePath);

        $zip = new \ZipArchive();

        $zip->open($filePath);
        self::assertSame(2, $zip->numFiles);
        self::assertEquals('fileA', $zip->getFromName('root/fileA.jpg'));
        self::assertEquals('fileB', $zip->getFromName('root/test/fileB.jpg'));

        @\unlink($filePath);
    }
}
