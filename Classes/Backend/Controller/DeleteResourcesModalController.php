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

namespace TYPO3\CMS\Mediamanager\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Mediamanager\Backend\Service\LanguageServiceProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\ResourcesDeleteHelperInterface;

class DeleteResourcesModalController
{
    /** @var ResourceFactory */
    private $resourceFactory;

    /** @var ResourcesDeleteHelperInterface */
    private $resourcesDeleteHelper;

    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    public function __construct(
        ResourceFactory $resourceFactory,
        ResourcesDeleteHelperInterface $resourcesDeleteHelper,
        LanguageServiceProvider $languageServiceProvider
    ) {
        $this->resourcesDeleteHelper = $resourcesDeleteHelper;
        $this->resourceFactory = $resourceFactory;
        $this->languageServiceProvider = $languageServiceProvider;
    }

    public function confirmModalDataAction(ServerRequestInterface $request): ResponseInterface
    {
        $queryParams = $request->getQueryParams();
        $identifiers = $queryParams['identifiers'] ?? [];

        if (\count($identifiers) === 0) {
            return new HtmlResponse('Parameter "identifiers" is missing or empty', 400);
        }

        $languageService = $this->languageServiceProvider->getLanguageService();

        $resources = array_map(
            function ($identifier) {
                return $this->resourceFactory->retrieveFileOrFolderObject($identifier);
            },
            $identifiers
        );

        $modalData = [
            'title' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:delete'),
            'closeText' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.cancel'),
            'deleteText' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.delete'),
            'message' => $this->resourcesDeleteHelper->getConfirmMessage($resources),
        ];

        return (new JsonResponse())->setPayload($modalData);
    }
}
