<?php declare(strict_types=1);

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
use TYPO3\CMS\Core\Core\ApplicationContext;
use TYPO3\CMS\Core\Core\Environment;
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
        $this->assertInstanceOf(IconUrlProviderInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_will_return_null_on_null_icon(): void
    {
        $this->assertNull($this->subject->getUrl(null));
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

    /**
     * @test
     */
    public function it_will_return_sprite_url_on_icon(): void
    {
        Environment::initialize(
            $this->createMock(ApplicationContext::class),
            false,
            false,
            '/project',
            '//public/',
            '/var/',
            '/config',
            '/',
            '/'
        );

        $icon = $this->createMock(Icon::class);
        $icon->method('getidentifier')
            ->willReturn('file-default');

        $this->iconRegistryMock->method('getIconConfigurationByIdentifier')
            ->with('file-default')
            ->willReturn([
                'options' => [
                    'sprite' => 'EXT:core/Resources/Public/Icons/T3Icons/sprites/apps.svg#apps-filetree-mount',
                ],
            ]);

        $result = $this->subject->getUrl($icon);
        $this->assertEquals('typo3-test/file.svg#default', $result);
    }
}
