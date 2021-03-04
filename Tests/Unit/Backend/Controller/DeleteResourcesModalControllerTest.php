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
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Mediamanager\Backend\Controller\DeleteResourcesModalController;
use TYPO3\CMS\Mediamanager\Backend\Service\LanguageServiceProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\ResourcesDeleteHelperInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class DeleteResourcesModalControllerTest extends UnitTestCase
{
    /** @var DeleteResourcesModalController */
    private $controller;

    /** @var \PHPUnit\Framework\MockObject\MockObject|ResourceFactory */
    private $resourceFactoryMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|ResourcesDeleteHelperInterface */
    private $resourcesDeleteHelperMock;

    /** @var \PHPUnit\Framework\MockObject\MockObject|LanguageService */
    private $languageServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->resourceFactoryMock = $this->createMock(ResourceFactory::class);
        $this->resourcesDeleteHelperMock = $this->createMock(ResourcesDeleteHelperInterface::class);

        $this->languageServiceMock = $this->createMock(LanguageService::class);
        $languageServiceProviderMock = $this->createConfiguredMock(LanguageServiceProvider::class, [
            'getLanguageService' => $this->languageServiceMock
        ]);
        $this->controller = new DeleteResourcesModalController($this->resourceFactoryMock, $this->resourcesDeleteHelperMock, $languageServiceProviderMock);
    }

    /**
     * @test
     */
    public function it_returns_a_400_status_code_on_missing_identifiers_parameter(): void
    {
        $request = new ServerRequest();
        $response = $this->controller->confirmModalDataAction($request);

        self::assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_a_400_status_code_on_empty_identifiers_parameter(): void
    {
        $request = new ServerRequest();
        $request->withQueryParams(['identifiers' => []]);

        $response = $this->controller->confirmModalDataAction($request);

        self::assertEquals(400, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_returns_confirm_delete_modal_data(): void
    {
        $request = new ServerRequest();
        $request = $request->withQueryParams(['identifiers' => ['14', '20']]);

        $this->languageServiceMock->method('sL')
            ->willReturn('translated_string');

        $fileMock = $this->createMock(File::class);
        $folderMock = $this->createMock(Folder::class);

        $this->resourcesDeleteHelperMock->expects(self::once())
            ->method('getConfirmMessage')
            ->willReturn('Confirm message');

        $this->resourceFactoryMock->method('retrieveFileOrFolderObject')
            ->withConsecutive(['14'], ['20'])
            ->willReturnOnConsecutiveCalls($fileMock, $folderMock);

        $response = $this->controller->confirmModalDataAction($request);

        self::assertEquals(200, $response->getStatusCode());
        self::assertInstanceOf(JsonResponse::class, $response);

        self::assertEquals([
            'message' => 'Confirm message',
            'title' => 'translated_string',
            'closeText' => 'translated_string',
            'deleteText' => 'translated_string',
        ], \json_decode($response->getBody()->getContents(), true));
    }
}
