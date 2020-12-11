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

namespace TYPO3\CMS\FilelistNg\Tests\Unit\Backend\Validator;

use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\FilelistNg\Backend\Validator\DownloadSizeValidatorFactory;
use TYPO3\CMS\FilelistNg\Backend\Validator\DownloadSizeValidatorFactoryInterface;
use TYPO3\CMS\FilelistNg\Backend\Validator\ResourcesSizeValidator;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class DownloadSizeValidatorFactoryTest extends UnitTestCase
{
    /** @var DownloadSizeValidatorFactory */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $extensionConfigurationMock = $this->createMock(ExtensionConfiguration::class);

        $extensionConfigurationMock->method('get')
            ->with('cms_filelist_ng', 'maxDownloadSizeMB')
            ->willReturn(500);

        $this->subject = new DownloadSizeValidatorFactory($extensionConfigurationMock);
    }

    /**
     * @test
     */
    public function it_implements_DownloadSizeValidatorFactoryInterface(): void
    {
        self::assertInstanceOf(DownloadSizeValidatorFactoryInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_can_create_DownloadSizeValidator(): void
    {
        $validator = $this->subject->createValidator();
        self::assertInstanceOf(ResourcesSizeValidator::class, $validator);
        self::assertEquals(['maximum' => 500], $validator->getOptions());
    }
}
