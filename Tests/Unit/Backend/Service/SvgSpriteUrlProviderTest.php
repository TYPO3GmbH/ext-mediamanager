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

use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconRegistry;
use TYPO3\CMS\FilelistNg\Backend\Service\IconUrlProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\SvgSpriteUrlProvider;

class SvgSpriteUrlProviderTest extends TestCase
{
    /** @var SvgSpriteUrlProvider */
    private $subject;

    /** @var \PHPUnit\Framework\MockObject\MockObject|IconRegistry */
    private $iconRegistryMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->iconRegistryMock = $this->createMock(IconRegistry::class);
        $this->subject = new SvgSpriteUrlProvider($this->iconRegistryMock);
    }

    /**
     * @test
     */
    public function it_implements_IconUrlProviderInterface(): void
    {
        self::assertInstanceOf(IconUrlProviderInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_will_return_null_on_null_icon(): void
    {
        self::assertNull($this->subject->getUrl(null));
    }

    /**
     * @test
     */
    public function it_will_throw_exception_on_missing_sprite(): void
    {
        $icon = $this->createMock(Icon::class);
        $icon->method('getidentifier')
            ->willReturn('file-default');

        $this->iconRegistryMock->method('getIconConfigurationByIdentifier')
            ->with('file-default')
            ->willReturn([
                'options' => [],
            ]);

        $this->expectException(\RuntimeException::class);
        $this->subject->getUrl($icon);
    }
}
