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

namespace TYPO3\CMS\FilelistNg\Tests\Unit\Backend\Controller;

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\FilelistNg\Backend\Controller\FolderTreeController;
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\Service\FolderTreeGenerator;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class FolderTreeControllerTest extends UnitTestCase
{
    /** @var FolderTreeController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|BackendUserProvider */
    private $backendUserProviderMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FolderTreeGenerator */
    private $folderTreeGeneratorMock;

    public function setUp(): void
    {
        parent::setUp();
        $this->backendUserProviderMock = $this->getMockBuilder(BackendUserProvider::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->folderTreeGeneratorMock = $this->getMockBuilder(FolderTreeGenerator::class)
            ->disableOriginalConstructor()
            ->getMock();

        $this->controller = new FolderTreeController(
            $this->backendUserProviderMock,
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

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_404_status_code_on_missing_storage_resource(): void
    {
        $backendUserMock = $this->getMockBuilder(BackendUserAuthentication::class)
            ->disableOriginalConstructor()
            ->getMock();

        $backendUserMock->method('getFileStorages')
            ->willReturn([]);

        $this->backendUserProviderMock->method('getBackendUser')
            ->willReturn($backendUserMock);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['storageId' => '123']);
        $response = $this->controller->fetchDataAction($request);

        $this->assertEquals(404, $response->getStatusCode());
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

        $backendUserMock = $this->getMockBuilder(BackendUserAuthentication::class)
            ->disableOriginalConstructor()
            ->getMock();

        $backendUserMock->method('getFileStorages')
            ->willReturn([$fileStorageMock]);

        $this->backendUserProviderMock->method('getBackendUser')
            ->willReturn($backendUserMock);

        $this->folderTreeGeneratorMock
            ->expects($this->once())
            ->method('getNodes')
            ->with($fileStorageMock)
            ->willReturn([]);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['storageId' => '123']);
        $response = $this->controller->fetchDataAction($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertInstanceOf(JsonResponse::class, $response);
    }
}
