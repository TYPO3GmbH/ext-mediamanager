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
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\FolderInterface;
use TYPO3\CMS\Core\Resource\MetaDataAspect;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Mediamanager\Backend\Service\FileReferencesProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\Service\FileThumbnailUrlProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\Service\FolderListGenerator;
use TYPO3\CMS\Mediamanager\Backend\Service\FolderThumbnailProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\Service\LanguageServiceProvider;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class FolderListGeneratorTest extends FunctionalTestCase
{
    /** @var FolderListGenerator */
    private $generator;

    protected $testExtensionsToLoad = [
        'typo3conf/ext/mediamanager',
    ];

    /** @var \PHPUnit\Framework\MockObject\MockObject|IconFactory */
    private $iconFactoryMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FileThumbnailUrlProviderInterface */
    private $fileThumbnailUrlProvider;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FolderThumbnailProviderInterface */
    private $folderThumbnailProvider;

    protected function setUp(): void
    {
        parent::setUp();

        $this->iconFactoryMock = $this->createMock(IconFactory::class);
        $fileReferencesProviderMock = $this->createMock(FileReferencesProviderInterface::class);

        $fileReferencesProviderMock->method('getReferencesCount')
            ->willReturn(2);

        $GLOBALS['LANG'] = LanguageService::create('default');

        $this->fileThumbnailUrlProvider = $this->createMock(FileThumbnailUrlProviderInterface::class);
        $this->folderThumbnailProvider = $this->createMock(FolderThumbnailProviderInterface::class);

        $this->generator = new FolderListGenerator(
            new LanguageServiceProvider(),
            $this->iconFactoryMock,
            GeneralUtility::makeInstance(UriBuilder::class),
            $fileReferencesProviderMock,
            $this->fileThumbnailUrlProvider,
            $this->folderThumbnailProvider
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

        $subFolder->expects(self::once())
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

        $subFolder->method('getParentFolder')
            ->willReturn($folderObject);

        $subFolder->method('getModificationTime')
            ->willReturn(1609319601);

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

        $folderObject->method('getCombinedIdentifier')
            ->willReturn('1:/');

        $this->folderThumbnailProvider->method('getFolderThumbnailIcon')
            ->willReturn('<svg></svg>');

        $result = $this->generator->getFolderItems($folderObject);

        self::assertEquals([[
            'identifier' => '1:/test-folder',
            'icon' => 'icon',
            'name' => 'TestFolder',
            'modified' => '30-12-20',
            'modifiedRaw' => 1609319601,
            'size' => '0 Files',
            'sizeRaw' => 0,
            'type' => 'Folder',
            'variants' => '-',
            'references' => '-',
            'rw' => 'R',
            'clipboardIdentifier' => '95ed07cec0',
            'sysType' => '_FOLDER',
            'cardFolderIcon' => '<svg></svg>',
            'parentIdentifier' => '1:/',
            'contextMenuType' => 'sys_file',

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

        $subFolder->expects(self::once())
            ->method('getRole')
            ->willReturn(FolderInterface::ROLE_PROCESSING);

        $storage->method('getFoldersInFolder')
            ->willReturn([$subFolder]);

        $folderObject->method('getStorage')
            ->willReturn($storage);

        $folderObject->method('getFiles')
            ->willReturn([]);

        $result = $this->generator->getFolderItems($folderObject);
        self::assertEquals([], $result);
    }

    /**
     * @test
     */
    public function it_can_generate_file_data(): void
    {
        $folderObject = $this->createMock(Folder::class);
        $storage = $this->createMock(ResourceStorage::class);
        $file = $this->createMock(File::class);
        $metaData = $this->createMock(MetaDataAspect::class);

        $metaData->method('get')->willReturn(['uid' => 42]);

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

        $file->method('getUid')
            ->willReturn(13);

        $file->method('isIndexed')
            ->willReturn(true);

        $file->method('getMetaData')
            ->willReturn($metaData);

        $file->method('checkActionPermission')
            ->willReturn(true);

        $file->method('getParentFolder')
            ->willReturn($folderObject);

        $file->method('getModificationTime')
            ->willReturn(1589846400);

        $file->method('getSize')
            ->willReturn(1200);

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

        $folderObject->method('getCombinedIdentifier')
            ->willReturn('1:/');

        $folderObject->method('getReadablePath')
            ->willReturn('/');

        $result = $this->generator->getFolderItems($folderObject);

        self::assertEquals([[
            'identifier' => '1:/test-file',
            'icon' => 'icon',
            'name' => 'Test-file',
            'modified' => '19-05-20',
            'modifiedRaw' => 1589846400,
            'size' => '1.17 KB',
            'sizeRaw' => 1200,
            'type' => 'XLS',
            'variants' => '-',
            'references' => 2,
            'rw' => 'RW',
            'clipboardIdentifier' => '4fbe4dde37',
            'thumbnailUrl' => null,
            'sysType' => '_FILE',
            'metaDataUrl' => '/typo3/record/edit?token=dummyToken&edit%5Bsys_file_metadata%5D%5B42%5D=edit&returnUrl=typo3conf%2Fext%2Fmediamanager%2FResources%2FPublic%2FHtml%2FCloseModal.html',
            'parentIdentifier' => '1:/',
            'path' => '/',
            'uid' => 13,
            'extension' => 'xls',
            'contextMenuType' => 'sys_file',
        ]], $result);
    }
}
