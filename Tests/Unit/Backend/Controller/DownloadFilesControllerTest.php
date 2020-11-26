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

use org\bovigo\vfs\vfsStream;
use org\bovigo\vfs\vfsStreamFile;
use TYPO3\CMS\Core\Http\RedirectResponse;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\FilelistNg\Backend\Controller\DownloadFilesController;
use TYPO3\CMS\FilelistNg\Backend\Service\ArchiveGeneratorInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class DownloadFilesControllerTest extends UnitTestCase
{
    /** @var DownloadFilesController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|ResourceFactory */
    private $resourceFactoryMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|ArchiveGeneratorInterface */
    private $archiveGeneratorMock;

    /** @var \org\bovigo\vfs\vfsStreamDirectory */
    private $fsMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->resourceFactoryMock = $this->createMock(ResourceFactory::class);
        $this->archiveGeneratorMock = $this->createMock(ArchiveGeneratorInterface::class);
        $this->controller = new DownloadFilesController($this->resourceFactoryMock, $this->archiveGeneratorMock);
        $this->fsMock = vfsStream::setup();
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
    public function it_redirects_to_public_file_url_on_single_file(): void
    {
        $request = new ServerRequest();
        $request = $request->withParsedBody(['identifiers' => ['14']]);

        $fileMock = $this->createMock(File::class);

        $fileMock->expects($this->once())
            ->method('checkActionPermission')
            ->with('read')
            ->willReturn(true);

        $fileMock->expects($this->once())
            ->method('getPublicUrl')
            ->willReturn('http://www.typo3.example/fileadmin/file.jpg');

        $this->resourceFactoryMock->expects($this->once())
            ->method('retrieveFileOrFolderObject')
            ->with('14')
            ->willReturn($fileMock);

        $response = $this->controller->downloadAction($request);

        $this->assertInstanceOf(RedirectResponse::class, $response);
        $this->assertEquals('http://www.typo3.example/fileadmin/file.jpg', $response->getHeader('location')[0]);
    }

    /**
     * @test
     */
    public function it_returns_a_403_status_code_on_non_readable_single_file(): void
    {
        $request = new ServerRequest();
        $request = $request->withParsedBody(['identifiers' => ['14']]);

        $fileMock = $this->createMock(File::class);

        $fileMock->expects($this->once())
            ->method('checkActionPermission')
            ->with('read')
            ->willReturn(false);

        $fileMock->expects($this->once())
            ->method('getName')
            ->willReturn('file.jpg');

        $this->resourceFactoryMock->expects($this->once())
            ->method('retrieveFileOrFolderObject')
            ->with('14')
            ->willReturn($fileMock);

        $response = $this->controller->downloadAction($request);

        $this->assertEquals(403, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_500_status_code_on_error_during_archive_generation(): void
    {
        $request = new ServerRequest();
        $request = $request->withParsedBody(['identifiers' => ['14', '20']]);

        $fileMock = $this->createMock(File::class);
        $folderMock = $this->createMock(Folder::class);

        $this->resourceFactoryMock->method('retrieveFileOrFolderObject')
            ->withConsecutive(['14'], ['20'])
            ->willReturnOnConsecutiveCalls($fileMock, $folderMock);

        $this->archiveGeneratorMock->expects($this->once())
            ->method('generateArchive')
            ->with([$fileMock, $folderMock])
            ->willThrowException(new \Exception('Something bad happened'));

        $response = $this->controller->downloadAction($request);

        $this->assertEquals(500, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_archive_on_successful_generation(): void
    {
        $request = new ServerRequest();
        $request = $request->withParsedBody(['identifiers' => ['14', '20']]);

        $fileMock = $this->createMock(File::class);
        $folderMock = $this->createMock(Folder::class);

        $vfsFileMock = new vfsStreamFile('data.zip');
        $this->fsMock->addChild($vfsFileMock);

        $this->resourceFactoryMock->method('retrieveFileOrFolderObject')
            ->withConsecutive(['14'], ['20'])
            ->willReturnOnConsecutiveCalls($fileMock, $folderMock);

        $this->archiveGeneratorMock->expects($this->once())
            ->method('generateArchive')
            ->with([$fileMock, $folderMock])
            ->willReturn($vfsFileMock->url());

        $response = $this->controller->downloadAction($request);

        $this->assertEquals(200, $response->getStatusCode());
    }
}
