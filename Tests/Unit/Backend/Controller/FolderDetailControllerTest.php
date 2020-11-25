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

use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\FilelistNg\Backend\Controller\FolderDetailController;
use TYPO3\CMS\FilelistNg\Backend\Service\FolderListGeneratorInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class FolderDetailControllerTest extends UnitTestCase
{
    /** @var FolderDetailController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|ResourceFactory */
    private $resourceFactory;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FolderListGeneratorInterface */
    private $folderListGenerator;

    public function setUp(): void
    {
        parent::setUp();

        $this->resourceFactory = $this->createMock(ResourceFactory::class);
        $this->folderListGenerator = $this->createMock(FolderListGeneratorInterface::class);

        $this->controller = new FolderDetailController(
            $this->resourceFactory,
            $this->folderListGenerator
        );
    }

    /**
     * @test
     */
    public function it_returns_a_400_status_code_on_missing_id_parameter(): void
    {
        $request = new ServerRequest();
        $response = $this->controller->fetchDataAction($request);

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_404_status_code_on_missing_storage(): void
    {
        $request = new ServerRequest();
        $request = $request->withQueryParams(['identifier' => '1:/introduction/']);

        $this->resourceFactory->expects($this->once())
            ->method('getStorageObjectFromCombinedIdentifier')
            ->with('1:/introduction/')
            ->willReturn(null);

        $response = $this->controller->fetchDataAction($request);
        $this->assertEquals(404, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_404_status_code_on_missing_folder(): void
    {
        $storage = $this->createMock(ResourceStorage::class);

        $storage->expects($this->once())
            ->method('hasFolder')
            ->with('/introduction/')
            ->willReturn(false);

        $this->resourceFactory->expects($this->once())
            ->method('getStorageObjectFromCombinedIdentifier')
            ->with('1:/introduction/')
            ->willReturn($storage);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['identifier' => '1:/introduction/']);

        $response = $this->controller->fetchDataAction($request);
        $this->assertEquals(404, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_405_status_code_on_missing_uid(): void
    {
        $storage = $this->createMock(ResourceStorage::class);

        $storage->expects($this->once())
            ->method('hasFolder')
            ->with('/introduction/')
            ->willReturn(true);

        $storage->expects($this->once())
            ->method('getUid')
            ->willReturn(0);

        $this->resourceFactory->expects($this->once())
            ->method('getStorageObjectFromCombinedIdentifier')
            ->with('1:/introduction/')
            ->willReturn($storage);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['identifier' => '1:/introduction/']);

        $response = $this->controller->fetchDataAction($request);
        $this->assertEquals(405, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_will_return_folder_list_data(): void
    {
        $storage = $this->createMock(ResourceStorage::class);
        $folder = $this->createMock(Folder::class);
        $sampleData = [['id' => '123']];

        $storage->expects($this->once())
            ->method('hasFolder')
            ->with('/introduction/')
            ->willReturn(true);

        $storage->expects($this->once())
            ->method('getUid')
            ->willReturn(123);

        $this->resourceFactory->expects($this->once())
            ->method('getStorageObjectFromCombinedIdentifier')
            ->with('1:/introduction/')
            ->willReturn($storage);

        $this->resourceFactory->expects($this->once())
            ->method('getFolderObjectFromCombinedIdentifier')
            ->with('1:/introduction/')
            ->willReturn($folder);

        $this->folderListGenerator->expects($this->once())
            ->method('getFolderItems')
            ->with($folder)
            ->willReturn($sampleData);

        $request = new ServerRequest();
        $request = $request->withQueryParams(['identifier' => '1:/introduction/']);

        $response = $this->controller->fetchDataAction($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($sampleData, \json_decode($response->getBody()->getContents(), true));
    }
}
