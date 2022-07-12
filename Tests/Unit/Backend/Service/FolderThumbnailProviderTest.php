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

namespace TYPO3\CMS\Mediamanager\Tests\Unit\Backend\Service;

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Mediamanager\Backend\Service\FileThumbnailUrlProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\Service\FolderThumbnailProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\FolderThumbnailProviderInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class FolderThumbnailProviderTest extends UnitTestCase
{
    /** @var FolderThumbnailProvider */
    private $subject;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FileThumbnailUrlProviderInterface */
    private $fileThumbnailUrlProviderMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->fileThumbnailUrlProviderMock = $this->createMock(FileThumbnailUrlProviderInterface::class);
        $this->subject = new FolderThumbnailProvider($this->fileThumbnailUrlProviderMock);
    }

    /**
     * @test
     */
    public function it_implements_FolderThumbnailProviderInterface(): void
    {
        self::assertInstanceOf(FolderThumbnailProviderInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_will_return_null_on_folder_without_image_or_media_files(): void
    {
        $file = $this->createMock(File::class);

        $folder = $this->createConfiguredMock(Folder::class, [
            'getFiles' => [$file],
        ]);

        self::assertNull($this->subject->getFolderThumbnailIcon($folder));
    }

    /**
     * @test
     */
    public function it_will_return_svg_on_folder_with_image(): void
    {
        $file = $this->createMock(File::class);
        $this->fileThumbnailUrlProviderMock->expects(self::once())
            ->method('getThumbnailUrl')
            ->with($file)
            ->willReturn('http://www.test.typo/file.jpg');

        $folder = $this->createConfiguredMock(Folder::class, [
            'getFiles' => [$file],
        ]);

        $result = $this->subject->getFolderThumbnailIcon($folder);

        self::assertStringContainsString('svg', $result);
        self::assertStringContainsString('http://www.test.typo/file.jpg', $result);
    }
}
