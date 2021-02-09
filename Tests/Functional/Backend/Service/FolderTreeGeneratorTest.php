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
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconRegistry;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Domain\Model\BackendUser;
use TYPO3\CMS\Mediamanager\Backend\Service\BackendUserProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\FolderTreeGenerator;
use TYPO3\CMS\Mediamanager\Backend\Service\LanguageServiceProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\SvgSpriteUrlProvider;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class FolderTreeGeneratorTest extends FunctionalTestCase
{
    /** @var FolderTreeGenerator */
    private $generator;

    protected $testExtensionsToLoad = [
        'typo3conf/ext/mediamanager',
    ];

    /** @var \PHPUnit\Framework\MockObject\MockObject|IconFactory */
    private $iconFactoryMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|BackendUser */
    private $backendUserMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->iconFactoryMock = $this->createMock(IconFactory::class);
        $this->backendUserMock = $this->createMock(BackendUserAuthentication::class);

        $this->backendUserMock->method('isAdmin')
            ->willReturn(true);

        $GLOBALS['LANG'] = LanguageService::create('default');
        $GLOBALS['BE_USER'] = $this->backendUserMock;

        $this->generator = new FolderTreeGenerator(
            new BackendUserProvider(),
            new LanguageServiceProvider(),
            $this->iconFactoryMock,
            GeneralUtility::makeInstance(UriBuilder::class),
            GeneralUtility::makeInstance(SvgSpriteUrlProvider::class, GeneralUtility::makeInstance(IconRegistry::class))
        );
    }

    /**
     * @test
     */
    public function it_can_generate_folder_tree(): void
    {
        $storage = $this->createMock(ResourceStorage::class);

        $subFolder = $this->createMock(Folder::class);
        $rootFolder = $this->createMock(Folder::class);

        $subFolder->method('getCombinedIdentifier')
            ->willReturn('1:/test-folder-sub');

        $subFolder->method('getName')
            ->willReturn('Subfolder');

        $subFolder->method('getSubfolders')
            ->willReturn([]);

        $subFolder->method('getStorage')
            ->willReturn($storage);

        $subFolder->method('checkActionPermission')
            ->with('rename')
            ->willReturn(true);

        $subFolder->method('getParentFolder')
            ->willReturn($rootFolder);

        $rootFolder->method('getStorage')
            ->willReturn($storage);

        $rootFolder->method('getCombinedIdentifier')
            ->willReturn('1:/test-folder');

        $rootFolder->method('getFileCount')
            ->willReturn(0);

        $rootFolder->method('checkActionPermission')
            ->with('rename')
            ->willReturn(false);

        $rootFolder->method('getSubfolders')
            ->willReturn([$subFolder]);

        $storage->method('getName')
            ->willReturn('TestFolder');

        $storage->method('getRootLevelFolder')
            ->willReturn($rootFolder);

        $storage->method('isBrowsable')
            ->willReturn(true);

        $storage->method('getFileMounts')
            ->willReturn([]);

        $icon = $this->createMock(Icon::class);

        $icon->method('getIdentifier')
            ->willReturn('apps-filetree-mount');

        $this->iconFactoryMock->method('getIconForResource')
            ->with($rootFolder)
            ->willReturn($icon);

        $result = $this->generator->getNodes($storage);

        self::assertEquals([
            [
                'stateIdentifier' => '_157208700',
                'identifier' => '1:/test-folder',
                'depth' => 0,
                'icon' => 'typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/apps.svg#apps-filetree-mount',
                'name' => 'TestFolder',
                'nameSourceField' => 'title',
                'siblingsCount' => 0,
                'siblingsPosition' => 0,
                'hasChildren' => true,
                'folderUrl' => '/typo3/ajax/filelist_ng/folder/fetchData?token=dummyToken&identifier=1%3A%2Ftest-folder',
                'contextMenuUrl' => '/typo3/ajax/context-menu?token=dummyToken&table=sys_file_storage&uid=1%3A%2Ftest-folder&context=tree',
                'clipboardIdentifier' => '95ed07cec0',
                'allowEdit' => false,
                'overlayIcon' => null,
                'parentIdentifier' => null,
                'sysType' => '_FOLDER',
            ],
            [
                'stateIdentifier' => '_230043429',
                'identifier' => '1:/test-folder-sub',
                'depth' => 1,
                'icon' => 'typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/apps.svg#apps-filetree-mount',
                'name' => 'Subfolder',
                'nameSourceField' => 'title',
                'siblingsCount' => 0,
                'siblingsPosition' => 2,
                'hasChildren' => false,
                'folderUrl' => '/typo3/ajax/filelist_ng/folder/fetchData?token=dummyToken&identifier=1%3A%2Ftest-folder-sub',
                'contextMenuUrl' => '/typo3/ajax/context-menu?token=dummyToken&table=sys_file&uid=1%3A%2Ftest-folder-sub&context=tree',
                'clipboardIdentifier' => 'db62f25b40',
                'allowEdit' => true,
                'overlayIcon' => null,
                'parentIdentifier' => '1:/test-folder',
                'sysType' => '_FOLDER',
            ],
        ], $result);
    }
}
