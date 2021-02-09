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

namespace TYPO3\CMS\FilelistNg\Tests\Functional\Backend\Service;

use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconRegistry;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\FilelistNg\Backend\Service\SvgSpriteUrlProvider;
use TYPO3\TestingFramework\Core\Functional\FunctionalTestCase;

class SvgSpriteUrlProviderTest extends FunctionalTestCase
{
    protected $testExtensionsToLoad = [
        'typo3conf/ext/cms_filelist_ng',
    ];

    /** @var SvgSpriteUrlProvider */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = new SvgSpriteUrlProvider(GeneralUtility::makeInstance(IconRegistry::class));
    }

    /**
     * @test
     */
    public function it_will_return_sprite_url_on_icon(): void
    {
        $icon = $this->createMock(Icon::class);
        $icon->method('getidentifier')
            ->willReturn('apps-filetree-mount');

        $result = $this->subject->getUrl($icon);
        self::assertEquals('typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/apps.svg#apps-filetree-mount', $result);
    }
}
