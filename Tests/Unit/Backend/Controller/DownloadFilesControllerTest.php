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
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\FilelistNg\Backend\Controller\DownloadFilesController;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class DownloadFilesControllerTest extends UnitTestCase
{
    /** @var DownloadFilesController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|ResourceFactory */
    private $resourceFactoryMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->resourceFactoryMock = $this->createMock(ResourceFactory::class);
        $this->controller = new DownloadFilesController($this->resourceFactoryMock);
    }

    /**
     * @test
     */
    public function it_returns_a_400_status_code_on_missing_identifiers_parameter(): void
    {
        $request = new ServerRequest();
        $response = $this->controller->downloadAction($request);

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_400_status_code_on_empty_identifiers_parameter(): void
    {
        $request = new ServerRequest();
        $request->withParsedBody(['identifiers' => []]);

        $response = $this->controller->downloadAction($request);

        $this->assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_the_public_file_url_on_single_file(): void
    {
        $request = new ServerRequest();
        $request = $request->withParsedBody(['identifiers' => ['14']]);

        $fileMock = $this->createMock(File::class);

        $fileMock->expects($this->once())
            ->method('getPublicUrl')
            ->willReturn('http://www.typo3.example/fileadmin/file.jpg');

        $this->resourceFactoryMock->expects($this->once())
            ->method('retrieveFileOrFolderObject')
            ->with('14')
            ->willReturn($fileMock);

        $response = $this->controller->downloadAction($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(['url' => 'http://www.typo3.example/fileadmin/file.jpg'], \json_decode($response->getBody()->getContents(), true));
    }
}
