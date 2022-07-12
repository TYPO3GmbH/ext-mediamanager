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

namespace Functional\Backend\Clipboard;

use TYPO3\CMS\Backend\Clipboard\Clipboard;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Mediamanager\Backend\Clipboard\MediamanagerAwareClipboard;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class MediamanagerAwareClipboardTest extends FunctionalTestCase
{
    protected $testExtensionsToLoad = [
        'typo3conf/ext/mediamanager',
    ];

    /** @var MediamanagerAwareClipboard */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->setUpBackendUserFromFixture(1);
        $this->subject = GeneralUtility::makeInstance(Clipboard::class);
    }

    /**
     * @test
     */
    protected function it_implements_MediamanagerAwareClipboard(): void
    {
        self::assertInstanceOf(MediamanagerAwareClipboard::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_will_return_mediamanager_by_default(): void
    {
        $this->subject->initializeClipboard();
        self::assertArrayHasKey(MediamanagerAwareClipboard::MEDIAMANAGER_CLIPBOARD_PAD, $this->subject->clipData);
    }

    /**
     * @test
     */
    public function it_overrides_existing_elements_on_cmd_with_elements_on_mediamanager_clip_pad(): void
    {
        $this->subject->initializeClipboard();
        $this->subject->setCurrentPad(MediamanagerAwareClipboard::MEDIAMANAGER_CLIPBOARD_PAD);

        $this->subject->clipData[MediamanagerAwareClipboard::MEDIAMANAGER_CLIPBOARD_PAD]['el'] = [
            'old_file.jpg',
        ];

        $data = [
            'el' => [
                 'file_1.jpg',
                 'file_2.jpg',
            ],
        ];

        $this->subject->setCmd($data);
        self::assertEquals($data['el'], $this->subject->clipData[MediamanagerAwareClipboard::MEDIAMANAGER_CLIPBOARD_PAD]['el']);
    }
}
