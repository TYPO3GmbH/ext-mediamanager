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

namespace TYPO3\CMS\FilelistNg\Tests\Unit\Backend\Storage;

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\Storage\StoragesProvider;
use TYPO3\CMS\FilelistNg\Backend\Storage\StoragesProviderInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class StoragesProviderTest extends UnitTestCase
{
    /** @var StoragesProvider */
    private $subject;

    /** @var \PHPUnit\Framework\MockObject\MockObject|BackendUserAuthentication */
    private $backendUserMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->backendUserMock = $this->getMockBuilder(BackendUserAuthentication::class)
            ->disableOriginalConstructor()
            ->getMock();

        /** @var \PHPUnit\Framework\MockObject\MockObject|BackendUserProvider $backendUserProviderMock */
        $backendUserProviderMock = $this->getMockBuilder(BackendUserProvider::class)
            ->disableOriginalConstructor()
            ->getMock();

        $backendUserProviderMock->method('getBackendUser')
            ->willReturn($this->backendUserMock);

        $this->subject = new StoragesProvider(
            $backendUserProviderMock,
            $this->createMock(IconFactory::class)
        );
    }

    /**
     * @test
     */
    public function it_implements_StoragesProviderInterface(): void
    {
        self::assertInstanceOf(StoragesProviderInterface::class, $this->subject);
    }

    /**
     * @test
     */
    public function it_can_return_storages(): void
    {
        $storageMock = $this->createMock(ResourceStorage::class);

        $this->backendUserMock->method('getFileStorages')
            ->willReturn([$storageMock]);

        self::assertEquals([$storageMock], $this->subject->getStoragesForUser());
    }

    /**
     * @test
     */
    public function it_can_return_storage_by_id(): void
    {
        $storageMockA = $this->createConfiguredMock(ResourceStorage::class, ['getUid' => 122]);
        $storageMockB = $this->createConfiguredMock(ResourceStorage::class, ['getUid' => 123]);

        $this->backendUserMock->method('getFileStorages')
            ->willReturn([$storageMockA, $storageMockB]);

        self::assertEquals($storageMockB, $this->subject->getStorageForUserById(123));
    }

    /**
     * @test
     */
    public function it_will_return_null_on_missing_storage_on_getStorageForUserById(): void
    {
        $storageMockA = $this->createConfiguredMock(ResourceStorage::class, ['getUid' => 122]);
        $storageMockB = $this->createConfiguredMock(ResourceStorage::class, ['getUid' => 123]);

        $this->backendUserMock->method('getFileStorages')
            ->willReturn([$storageMockA, $storageMockB]);

        self::assertNull($this->subject->getStorageForUserById(124));
    }
}
