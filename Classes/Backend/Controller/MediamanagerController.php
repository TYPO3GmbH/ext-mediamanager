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
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Mediamanager\Backend\Service\AppConfigProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\Service\BackendUserProvider;
use TYPO3\CMS\Mediamanager\Backend\Storage\StoragesProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\View\BackendTemplateView;

class MediamanagerController
{
    /** @var BackendTemplateView */
    private $view;

    /** @var UriBuilder */
    private $uriBuilder;

    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var AppConfigProviderInterface */
    private $appConfigProvider;

    /** @var StoragesProviderInterface */
    private $storagesProvider;

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder,
        BackendUserProvider $backendUserProvider,
        AppConfigProviderInterface $appConfigProvider,
        StoragesProviderInterface $storagesProvider
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->backendUserProvider = $backendUserProvider;
        $this->view->initializeView();
        $this->storagesProvider = $storagesProvider;
        $this->appConfigProvider = $appConfigProvider;
    }

    public function indexAction(): ResponseInterface
    {
        $storages = $this->getStoragesData();
        $backendUser = $this->backendUserProvider->getBackendUser();

        $fileListUrl = $this->uriBuilder->buildUriFromRoutePath('/module/file/Mediamanager');

        $backendUrls = [];

        if ($backendUser->check('tables_modify', 'sys_file_storage')) {
            $backendUrls['newStorageUrl'] = (string)$this->uriBuilder->buildUriFromRoute('record_edit', [
                'edit[sys_file_storage][0]' => 'new',
                'returnUrl' => (string)$fileListUrl,
            ]);
        }

        if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('beuser') && $backendUser->check('module', 'beuser')) {
            $backendUrls['switchUserUrl'] = (string)$this->uriBuilder->buildUriFromRoute('system_BeuserTxBeuser');
        }

        $this->addGlobalVars($backendUrls);
        $this->view->assign('storages', $storages);
        $this->view->assign('userName', $backendUser->user['username']);

        return new HtmlResponse($this->view->render());
    }

    public function storageAction(ServerRequestInterface $request): ResponseInterface
    {
        $this->view->getRenderingContext()->setControllerAction('storage');

        $storageUid = $request->getQueryParams()['uid'] ?? null;
        if (null === $storageUid) {
            return new HtmlResponse('Parameter "uid" is missing', 400);
        }

        $storages = $this->getStoragesData();

        $this->addGlobalVars([
            'fileActionUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_file_process'),
            'fileExistsUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_file_exists'),
            'treeUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_mediamanager_tree_fetchData', ['uid' => $storageUid]),
            'flashMessagesUrl' =>  (string)$this->uriBuilder->buildUriFromRoute('ajax_flashmessages_render'),
            'clipboardUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_contextmenu_clipboard'),
            'downloadFilesUrl' => (string)$this->uriBuilder->buildUriFromRoute('mediamanager_download_files'),
            'editFileStorageUrl' => (string)$this->uriBuilder->buildUriFromRoute('record_edit'),
            'searchFilesUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_mediamanager_search_files', ['uid' => $storageUid]),
        ]);
        $this->view->assign('storages', $storages);
        $this->view->assign('selectedStorageUid', (int)$storageUid);

        return new HtmlResponse($this->view->render());
    }

    /**
     * @return mixed[]
     */
    private function getStoragesData(): array
    {
        return \array_map(function (array $storage) {
            $storage['storageUrl'] = (string)$this->uriBuilder->buildUriFromRoute('mediamanager_storage', ['uid' => $storage['uid']]);
            return $storage;
        }, $this->storagesProvider->getFormattedStoragesForUser());
    }

    private function addGlobalVars(array $backendUrls): void
    {
        $appConfig = $this->appConfigProvider->getConfig();
        $appConfig['backendUrls'] = $backendUrls;

        $this->view->assign('appConfig', $appConfig);
    }
}
