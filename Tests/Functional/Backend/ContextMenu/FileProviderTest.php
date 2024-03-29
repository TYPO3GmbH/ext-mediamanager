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

namespace TYPO3\CMS\Mediamanager\Tests\Functional\Backend\ContextMenu;

use TYPO3\CMS\Backend\Clipboard\Clipboard;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Resource\ResourceInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileProvider;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class FileProviderTest extends FunctionalTestCase
{
    protected $testExtensionsToLoad = [
        'typo3conf/ext/mediamanager',
    ];

    /** @var \PHPUnit\Framework\MockObject\MockObject|ResourceFactory */
    private $resourceFactoryMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|Clipboard */
    private $clipboardMock;

    protected function setUp(): void
    {
        parent::setUp();

        $GLOBALS['LANG'] = LanguageService::create('default');

        $this->setUpBackendUserFromFixture(1);

        $this->resourceFactoryMock = $this->createMock(ResourceFactory::class);
        $this->clipboardMock = $this->createMock(Clipboard::class);

        GeneralUtility::setSingletonInstance(ResourceFactory::class, $this->resourceFactoryMock);
        GeneralUtility::addInstance(Clipboard::class, $this->clipboardMock);
    }

    /**
     * @test
     */
    public function it_can_handle_files(): void
    {
        $subject = new FileProvider('sys_file', \json_encode(['1:/fileA.jpg']), 'tree');

        self::assertTrue($subject->canHandle());
    }

    /**
     * @test
     */
    public function it_wont_handle_something_other_than_files(): void
    {
        $subject =  new FileProvider('something_different', \json_encode(['1:/fileA.jpg']), 'tree');
        self::assertFalse($subject->canHandle());
    }

    /**
     * @test
     *
     * @dataProvider provideData
     */
    public function it_returns_correct_options(
        array $expectedItemsKeys,
        ResourceInterface $resource,
        $copyPasteFeatureFlag = false,
        string $context = 'list'
    ): void {
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['features'][FileProvider::COPY_PASTE_FEATURE_NAME] = $copyPasteFeatureFlag;

        $subject =  new FileProvider('sys_file', json_encode(['1:/fileA.jpg']), $context);

        $this->resourceFactoryMock->method('retrieveFileOrFolderObject')
            ->willReturn($resource);

        $itemKeys = \array_keys($subject->addItems([]));

        self::assertEquals($expectedItemsKeys, $itemKeys);
    }

    public function provideData(): iterable
    {
        $readableFile = $this->createMock(File::class);
        $readableFile->method('checkActionPermission')
            ->willReturn(false);

        yield 'Readable file' => [
            ['info', 'show', 'divider', 'divider2'],
            $readableFile,
        ];

        $readableFolder = $this->createMock(Folder::class);
        $readableFolder->method('checkActionPermission')
            ->willReturn(false);

        yield 'Readable folder' => [
            ['divider', 'divider2'],
            $readableFolder,
        ];

        $writableFile = $this->createMock(File::class);
        $writableFile->method('checkActionPermission')
            ->willReturn(true);

        yield 'Writable file' => [
            ['info', 'show', 'download', 'divider', 'divider2', 'replace', 'delete'],
            $writableFile,
        ];

        yield 'Writable file (copy paste feature flag enabled)' => [
            ['info', 'show', 'download', 'divider', 'copy', 'cut', 'divider2', 'replace', 'delete'],
            $writableFile,
            true,
        ];

        $writableFolder = $this->createMock(Folder::class);
        $writableFolder->method('checkActionPermission')
            ->willReturn(true);

        yield 'Writable folder' => [
            ['download', 'divider', 'divider2', 'delete'],
            $writableFolder,
        ];

        yield 'Writable folder (copy paste feature flag enabled)' => [
            ['download', 'divider', 'copy', 'cut', 'divider2', 'delete'],
            $writableFolder,
            true,
        ];

        yield 'Writable folder (tree context)' => [
            ['new', 'divider', 'divider2', 'delete'],
            $writableFolder,
            false,
            'tree',
        ];

        yield 'Writable folder (tree context & copy paste feature flag enabled)' => [
            ['new', 'divider', 'copy', 'cut', 'divider2', 'delete'],
            $writableFolder,
            true,
            'tree',
        ];
    }
}
