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

namespace TYPO3\CMS\Mediamanager\Tests\Unit\Backend\Controller;

use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Mediamanager\Backend\Controller\FolderTreeController;
use TYPO3\CMS\Mediamanager\Backend\Service\FolderTreeGeneratorInterface;
use TYPO3\CMS\Mediamanager\Backend\Storage\StoragesProviderInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class FolderTreeControllerTest extends UnitTestCase
{
    /** @var FolderTreeController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FolderTreeGeneratorInterface */
    private $folderTreeGeneratorMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|StoragesProviderInterface */
    private $StoragesProviderMock;

    public function setUp(): void
    {
        parent::setUp();
        $this->StoragesProviderMock = $this->getMockBuilder(StoragesProviderInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->folderTreeGeneratorMock = $this->getMockBuilder(FolderTreeGeneratorInterface::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->controller = new FolderTreeController(
            $this->StoragesProviderMock,
            $this->folderTreeGeneratorMock
        );
    }

    /**
     * @test
     */
    public function it_returns_a_400_status_code_on_missing_storageId_parameter(): void
    {
        $request = new ServerRequest();
        $response = $this->controller->fetchDataAction($request);

        self::assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_404_status_code_on_missing_storage_resource(): void
    {
        $this->StoragesProviderMock->expects(self::once())
            ->method('getStorageForUserById')
            ->with(123)
            ->willReturn(null);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['uid' => '123']);
        $response = $this->controller->fetchDataAction($request);

        self::assertEquals(404, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_generated_folder(): void
    {
        $fileStorageMock = $this->getMockBuilder(ResourceStorage::class)
            ->disableOriginalConstructor()
            ->getMock();

        $fileStorageMock->method('getUid')
            ->willReturn(123);

        $this->StoragesProviderMock->expects(self::once())
            ->method('getStorageForUserById')
            ->with(123)
            ->willReturn($fileStorageMock);

        $this->folderTreeGeneratorMock
            ->expects(self::once())
            ->method('getNodes')
            ->with($fileStorageMock)
            ->willReturn([]);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['uid' => '123']);
        $response = $this->controller->fetchDataAction($request);

        self::assertEquals(200, $response->getStatusCode());
        self::assertInstanceOf(JsonResponse::class, $response);
    }
}
