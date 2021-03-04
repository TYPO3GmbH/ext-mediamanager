<?php

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

use TYPO3\CMS\Core\Core\ApplicationContext;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ProcessedFile;
use TYPO3\CMS\Mediamanager\Backend\Service\FileThumbnailUrlProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\FileThumbnailUrlProviderInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class FileThumbnailUrlProviderTest extends UnitTestCase
{
    /** @var FileThumbnailUrlProvider */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = new FileThumbnailUrlProvider();
        Environment::initialize(
            new ApplicationContext('Development'),
            true,
            true,
            '',
            'public',
            '',
            '',
            '',
            Environment::isWindows() ? 'WINDOWS' : 'UNIX'
        );
    }

    /**
     * @test
     */
    public function it_implements_FileThumbnailUrlProviderInterface(): void
    {
        self::assertInstanceOf(FileThumbnailUrlProviderInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_will_return_null_on_files_without_thumbnails(): void
    {
        $file = $this->createConfiguredMock(File::class, [
            'isImage' => false,
            'isMediaFile' => false,
        ]);

        self::assertNull($this->subject->getThumbnailUrl($file));
    }

    /**
     * @test
     */
    public function it_will_return_null_for_iamges_without_processedFile(): void
    {
        $file = $this->createConfiguredMock(File::class, [
            'isImage' => true,
            'isMediaFile' => true,
        ]);

        self::assertNull($this->subject->getThumbnailUrl($file));
    }

    /**
     * @test
     */
    public function it_will_return_url_for_image_file(): void
    {
        $processedFile = $this->createConfiguredMock(ProcessedFile::class, [
            'getPublicUrl' => '/resource.jpg'
        ]);

        $file = $this->createConfiguredMock(File::class, [
            'isImage' => true,
            'process' => $processedFile
        ]);

        self::assertEquals('/resource.jpg', $this->subject->getThumbnailUrl($file));
    }

    /**
     * @test
     */
    public function it_will_return_url_for_media_file(): void
    {
        $processedFile = $this->createConfiguredMock(ProcessedFile::class, [
            'getPublicUrl' => '/resource.jpg'
        ]);

        $file = $this->createConfiguredMock(File::class, [
            'isImage' => false,
            'isMediaFile' => true,
            'process' => $processedFile
        ]);

        self::assertEquals('/resource.jpg', $this->subject->getThumbnailUrl($file));
    }
}
