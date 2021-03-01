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

namespace TYPO3\CMS\Mediamanager\Tests\Unit\Backend\EventListener;

use TYPO3\CMS\Core\Imaging\Event\ModifyIconForResourcePropertiesEvent;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Mediamanager\Backend\EventListener\ModifyFolderIconListener;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class ModifyFolderIconListenerTest extends UnitTestCase
{
    /** @var ModifyFolderIconListener */
    private $subject;

    protected function setUp(): void
    {
        $this->subject = new ModifyFolderIconListener();
    }

    /**
     * @test
     * @dataProvider provideNoModifiactionEvents
     */
    public function it_wont_modify_icon_if_not_necessary(string $iconIdentifier, ModifyIconForResourcePropertiesEvent $event): void
    {
        $this->subject->__invoke($event);
        self::assertEquals($iconIdentifier, $event->getIconIdentifier());
    }

    /**
     * @test
     * @dataProvider provideModificationEvents
     */
    public function it_will_modify_icon_if_folder_with_default_icon(string $iconIdentifier, ModifyIconForResourcePropertiesEvent $event): void
    {
        $this->subject->__invoke($event);
        self::assertEquals($iconIdentifier, $event->getIconIdentifier());
    }

    public function provideNoModifiactionEvents(): iterable
    {
        yield 'File' => [
            'file-identifier',
            new ModifyIconForResourcePropertiesEvent(
                $this->createMock(File::class),
                Icon::SIZE_DEFAULT,
                [],
                'file-identifier',
                'overlay-identifier'
            ),
        ];

        yield 'Folder with no default icon' => [
            'special-folder-identifier',
            new ModifyIconForResourcePropertiesEvent(
                $this->createMock(File::class),
                Icon::SIZE_DEFAULT,
                [],
                'special-folder-identifier',
                'overlay-identifier'
            ),
        ];
    }

    public function provideModificationEvents(): iterable
    {
        yield 'Empty directory' => [
            'files-folder',
            new ModifyIconForResourcePropertiesEvent(
                $this->createConfiguredMock(Folder::class, [
                    'getFileCount' => 0,
                    'getSubfolders' => []
                ]),
                Icon::SIZE_DEFAULT,
                [],
                'apps-filetree-folder-default',
                null
            ),
        ];

        yield 'Folder with files' => [
            'files-folder-content',
            new ModifyIconForResourcePropertiesEvent(
                $this->createConfiguredMock(Folder::class, [
                    'getFileCount' => 1,
                    'getSubfolders' => []
                ]),
                Icon::SIZE_DEFAULT,
                [],
                'apps-filetree-folder-default',
                null
            ),
        ];

        yield 'Folder with subfolders' => [
            'files-folder-content',
            new ModifyIconForResourcePropertiesEvent(
                $this->createConfiguredMock(Folder::class, [
                    'getFileCount' => 0,
                    'getSubfolders' => [$this->createMock(Folder::class)]
                ]),
                Icon::SIZE_DEFAULT,
                [],
                'apps-filetree-folder-default',
                null
            ),
        ];

        yield 'Folder with no default icon' => [
            'special-folder-identifier',
            new ModifyIconForResourcePropertiesEvent(
                $this->createMock(File::class),
                Icon::SIZE_DEFAULT,
                [],
                'special-folder-identifier',
                'overlay-identifier'
            ),
        ];
    }
}
