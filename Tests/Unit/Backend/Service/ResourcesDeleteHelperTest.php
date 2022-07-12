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

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\ResourceInterface;
use TYPO3\CMS\Mediamanager\Backend\Service\BackendUserProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\LanguageServiceProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\ResourcesDeleteHelper;
use TYPO3\CMS\Mediamanager\Backend\Service\ResourcesDeleteHelperInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class ResourcesDeleteHelperTest extends UnitTestCase
{
    /** @var ResourcesDeleteHelper */
    private $subject;

    /** @var \PHPUnit\Framework\MockObject\MockObject|LanguageService */
    private $languageServiceMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|BackendUserAuthentication */
    private $backendUserMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->languageServiceMock = $this->createMock(LanguageService::class);
        $this->backendUserMock = $this->createMock(BackendUserAuthentication::class);
        $this->backendUserMock->uc = ['titleLen' => 200];

        $languageServiceProviderMock = $this->createConfiguredMock(LanguageServiceProvider::class, [
            'getLanguageService' => $this->languageServiceMock,
        ]);
        $backendUserProvider = $this->createConfiguredMock(BackendUserProvider::class, [
            'getBackendUser' => $this->backendUserMock,
        ]);

        $this->subject = new ResourcesDeleteHelper($languageServiceProviderMock, $backendUserProvider);
    }

    /**
     * @test
     */
    public function it_implements_ResourcesDeleteHelperInterface(): void
    {
        self::assertInstanceOf(ResourcesDeleteHelperInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_will_return_empty_string_on_empty_resources_array(): void
    {
        self::assertEmpty($this->subject->getConfirmMessage([]));
    }

    /**
     * @test
     */
    public function it_will_return_single_resource_confirm_message(): void
    {
        $this->languageServiceMock
            ->method('sl')
            ->willReturn("Are you sure you want to delete '%s'?");

        $resource = $this->createConfiguredMock(ResourceInterface::class, [
            'getName' => 'fileA.jpg',
        ]);

        self::assertStringContainsString(
            "Are you sure you want to delete 'fileA.jpg'?",
            $this->subject->getConfirmMessage([$resource])
        );
    }

    /**
     * @test
     */
    public function it_will_return_multi_resource_confirm_message(): void
    {
        $resource1 = $this->createConfiguredMock(ResourceInterface::class, [
            'getName' => 'file1.jpg',
        ]);

        $resource2 = $this->createConfiguredMock(ResourceInterface::class, [
            'getName' => 'folder',
        ]);

        $confirmMessage = $this->subject->getConfirmMessage([$resource1, $resource2]);
        self::assertStringContainsString('file1.jpg', $confirmMessage);
        self::assertStringContainsString('folder', $confirmMessage);
    }
}
