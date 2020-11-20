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

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\FolderInterface;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\FilelistNg\Backend\Service\FolderListGenerator;
use TYPO3\CMS\FilelistNg\Backend\Service\LanguageServiceProvider;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class FolderListGeneratorTest extends FunctionalTestCase
{
    /** @var FolderListGenerator */
    private $generator;

    protected $testExtensionsToLoad = [
        'typo3conf/ext/cms_filelist_ng',
    ];

    /** @var \PHPUnit\Framework\MockObject\MockObject|IconFactory */
    private $iconFactoryMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->iconFactoryMock = $this->createMock(IconFactory::class);

        $GLOBALS['LANG'] = LanguageService::create('default');
        $this->generator = new FolderListGenerator(
            new LanguageServiceProvider(),
            $this->iconFactoryMock,
            GeneralUtility::makeInstance(UriBuilder::class),
            GeneralUtility::makeInstance(ConnectionPool::class)
        );
    }

    /**
     * @test
     */
    public function it_can_generate_folder_data(): void
    {
        $folderObject = $this->createMock(Folder::class);
        $storage = $this->createMock(ResourceStorage::class);
        $subFolder = $this->createMock(Folder::class);

        $storage->method('getFoldersInFolder')
            ->willReturn([$subFolder]);

        $subFolder->expects($this->once())
            ->method('getRole')
            ->willReturn(FolderInterface::ROLE_DEFAULT);

        $subFolder->method('getStorage')
            ->willReturn($storage);

        $subFolder->method('getCombinedIdentifier')
            ->willReturn('1:/test-folder');

        $subFolder->method('getName')
            ->willReturn('TestFolder');

        $subFolder->method('getFileCount')
            ->willReturn(0);

        $icon = $this->createMock(Icon::class);

        $icon->method('getMarkup')
            ->willReturn('icon');

        $this->iconFactoryMock->method('getIconForResource')
            ->with($subFolder)
            ->willReturn($icon);

        $folderObject->method('getStorage')
            ->willReturn($storage);

        $folderObject->method('getFiles')
            ->willReturn([]);

        $result = $this->generator->getFolderItems($folderObject);

        $this->assertEquals([[
            'uid' => '1:/test-folder',
            'icon' => 'icon',
            'name' => 'TestFolder',
            'modified' => '01-01-70',
            'size' => '0 Files',
            'type' => 'Folder',
            'variants' => '-',
            'references' => '-',
            'rw' => 'R',
            'contextMenuUrl' => '/typo3/index.php?route=%2Fajax%2Fcontext-menu&token=dummyToken&table=sys_file&uid=1%3A%2Ftest-folder',
        ]], $result);
    }

    /**
     * @test
     */
    public function it_skips_processing_folders(): void
    {
        $folderObject = $this->createMock(Folder::class);
        $storage = $this->createMock(ResourceStorage::class);
        $subFolder = $this->createMock(Folder::class);

        $subFolder->expects($this->once())
            ->method('getRole')
            ->willReturn(FolderInterface::ROLE_PROCESSING);

        $storage->method('getFoldersInFolder')
            ->willReturn([$subFolder]);

        $folderObject->method('getStorage')
            ->willReturn($storage);

        $folderObject->method('getFiles')
            ->willReturn([]);

        $result = $this->generator->getFolderItems($folderObject);
        $this->assertEquals([], $result);
    }

    /**
     * @test
     */
    public function it_can_generate_file_data(): void
    {
        $folderObject = $this->createMock(Folder::class);
        $storage = $this->createMock(ResourceStorage::class);
        $file = $this->createMock(File::class);

        $storage->method('getFoldersInFolder')
            ->willReturn([]);

        $file->method('getStorage')
            ->willReturn($storage);

        $file->method('getCombinedIdentifier')
            ->willReturn('1:/test-file');

        $file->method('getName')
            ->willReturn('Test-file');

        $file->method('getExtension')
            ->willReturn('xls');

        $icon = $this->createMock(Icon::class);

        $icon->method('getMarkup')
            ->willReturn('icon');

        $this->iconFactoryMock->method('getIconForResource')
            ->with($file)
            ->willReturn($icon);

        $folderObject->method('getFiles')
            ->willReturn([$file]);

        $folderObject->method('getStorage')
            ->willReturn($storage);

        $result = $this->generator->getFolderItems($folderObject);

        $this->assertEquals([[
            'uid' => '1:/test-file',
            'icon' => 'icon',
            'name' => 'Test-file',
            'modified' => '01-01-70',
            'size' => '0 B',
            'type' => 'XLS',
            'variants' => '-',
            'references' => '-',
            'rw' => 'R',
            'contextMenuUrl' => '/typo3/index.php?route=%2Fajax%2Fcontext-menu&token=dummyToken&table=sys_file&uid=1%3A%2Ftest-file',
            'thumbnailUrl' => null,
            'thumbnailWidth' => 190,
        ]], $result);
    }
}
