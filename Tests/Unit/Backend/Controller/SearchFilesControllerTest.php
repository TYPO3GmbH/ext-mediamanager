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
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\Core\Resource\Search\Result\FileSearchResultInterface;
use TYPO3\CMS\FilelistNg\Backend\Controller\SearchFilesController;
use TYPO3\CMS\FilelistNg\Backend\Service\FolderListGeneratorInterface;
use TYPO3\CMS\FilelistNg\Backend\Storage\StorageProviderInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class SearchFilesControllerTest extends UnitTestCase
{
    /** @var SearchFilesController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|StorageProviderInterface */
    private $storageProviderMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|FolderListGeneratorInterface */
    private $folderListGeneratorMock;

    public function setUp(): void
    {
        parent::setUp();

        $this->storageProviderMock = $this->createMock(StorageProviderInterface::class);
        $this->folderListGeneratorMock = $this->createMock(FolderListGeneratorInterface::class);

        $this->controller = new SearchFilesController(
            $this->storageProviderMock,
            $this->folderListGeneratorMock
        );
    }

    /**
     * @test
     *
     * @dataProvider provideMissingMandatoryParams
     */
    public function it_returns_a_400_status_code_on_missing_mandatory_params(array $params): void
    {
        $request = new ServerRequest();
        $request = $request->withQueryParams($params);
        $response = $this->controller->searchAction($request);

        self::assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_404_status_code_on_missing_storage(): void
    {
        $request = new ServerRequest();
        $request = $request->withQueryParams(['search' => 'foo', 'uid' => '42']);

        $response = $this->controller->searchAction($request);
        self::assertEquals(404, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_can_return_search_result_data(): void
    {
        $request = new ServerRequest();
        $request = $request->withQueryParams(['search' => 'foo', 'uid' => '42']);

        $fileA = $this->createMock(File::class);
        $fileB = $this->createMock(File::class);

        $storage = $this->createMock(ResourceStorage::class);

        $storage->expects(self::once())
            ->method('searchFiles')
            ->willReturn(new FileSearchResult([$fileA, $fileB]));

        $this->storageProviderMock->expects(self::once())
            ->method('getStorageForUserById')
            ->with(42)
            ->willReturn($storage);

        $this->folderListGeneratorMock->expects(self::exactly(2))
            ->method('formatFile')
            ->withConsecutive([$fileA], [$fileB])
            ->willReturnOnConsecutiveCalls(['id' => 1], ['id' => 2]);

        $response = $this->controller->searchAction($request);

        self::assertEquals(200, $response->getStatusCode());
        self::assertInstanceOf(JsonResponse::class, $response);
        self::assertEquals([['id' => 1], ['id' => 2]], \json_decode($response->getBody()->getContents(), true));
    }

    public function provideMissingMandatoryParams(): iterable
    {
        yield 'No params' => [[]];
        yield 'Missing storage Id' => [['search' => 'xyz']];
        yield 'Missing search term' => [['uid' => '123']];
    }
}

class FileSearchResult extends \ArrayIterator implements FileSearchResultInterface
{
}
