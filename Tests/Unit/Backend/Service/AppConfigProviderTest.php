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

use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\FilelistNg\Backend\Service\AppConfigProvider;
use TYPO3\CMS\FilelistNg\Backend\Service\AppConfigProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\IconUrlProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\LanguageServiceProvider;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class AppConfigProviderTest extends UnitTestCase
{
    /** @var AppConfigProvider */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = new AppConfigProvider(
            $this->createMock(LanguageServiceProvider::class),
            $this->createMock(IconFactory::class),
            $this->createMock(IconUrlProviderInterface::class)
        );
    }

    /**
     * @test
     */
    public function it_implements_AppConfigProviderInterface(): void
    {
        self::assertInstanceOf(AppConfigProviderInterface::class, $this->subject);
    }

    public function it_can_return_app_config(): void
    {
        $config = $this->subject->getConfig();

        self::assertIsArray($config);
        self::assertArrayHasKey('translations', $config);
        self::assertArrayHasKey('iconUrls', $config);
    }
}
