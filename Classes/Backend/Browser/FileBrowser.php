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

namespace TYPO3\CMS\Mediamanager\Backend\Browser;

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\ServerRequestFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Mediamanager\Backend\Service\AppConfigProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\Storage\StoragesProviderInterface;
use TYPO3\CMS\Mediamanager\Backend\View\BackendTemplateView;
use TYPO3\CMS\Recordlist\Browser\ElementBrowserInterface;

class FileBrowser implements ElementBrowserInterface
{
    /** @var UriBuilder */
    private $uriBuilder;

    /** @var StoragesProviderInterface */
    private $storagesProvider;

    /** @var AppConfigProviderInterface */
    private $appConfigProvider;

    /** @var BackendTemplateView */
    private $view;

    /** @var string|null */
    protected $expandFolder;

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder,
        AppConfigProviderInterface $appConfigProvider,
        StoragesProviderInterface $storagesProvider
    ) {
        $this->uriBuilder = $uriBuilder;
        $this->appConfigProvider = $appConfigProvider;
        $this->storagesProvider = $storagesProvider;
        $this->view = $view;
        $this->view->initializeView();
    }

    public function render()
    {
        $bparams = GeneralUtility::_GP('bparams');
        $this->expandFolder = GeneralUtility::_GP('expandFolder');

        $this->view->getRenderingContext()->setControllerAction('FileBrowser');

        // The key number 3 of the bparams contains the "allowed" string. Disallowed is not passed to
        // the element browser at all but only filtered out in DataHandler afterwards
        $allowedFileExtensions = GeneralUtility::trimExplode(',', \explode('|', $bparams)[3], true);

        // The key number 3 of the bparams contains the irre (Inline Relational Record Editing) object id
        $irreObjectId = \explode('|', $bparams)[4];

        $request = ServerRequestFactory::fromGlobals();
        $storageUid = $request->getQueryParams()['uid'] ?? \current($this->storagesProvider->getStoragesForUser())->getUid();

        $storages = $this->getStoragesData();

        $backendUrls = [
            'fileActionUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_file_process'),
            'treeUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_mediamanager_tree_fetchData', ['uid' => $storageUid]),
            'flashMessagesUrl' =>  (string)$this->uriBuilder->buildUriFromRoute('ajax_flashmessages_render'),
            'clipboardUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_contextmenu_clipboard'),
            'downloadFilesUrl' => (string)$this->uriBuilder->buildUriFromRoute('mediamanager_download_files'),
            'editFileStorageUrl' => (string)$this->uriBuilder->buildUriFromRoute('record_edit'),
            'searchFilesUrl' => (string)$this->uriBuilder->buildUriFromRoute('ajax_mediamanager_search_files', ['uid' => $storageUid]),
        ];

        $appConfig = $this->appConfigProvider->getConfig();
        $appConfig['backendUrls'] = $backendUrls;

        $this->view->assign('appConfig', $appConfig);
        $this->view->assign('irreObjectId', $irreObjectId);
        $this->view->assign('allowedFileExtensions', $allowedFileExtensions);
        $this->view->assign('treeUrl', $backendUrls['treeUrl']);
        $this->view->assign('storages', $storages);
        $this->view->assign('expandFolder', $this->expandFolder);

        $this->view->assign('selectedStorageUid', (int)$storageUid);

        return $this->view->render();
    }

    /***
     * @return mixed[]
     */
    private function getStoragesData(): array
    {
        $serverRequest = ServerRequestFactory::fromGlobals();
        $uri = (string)$serverRequest->getUri();

        return \array_map(static function (array $storage) use ($uri) {
            $storage['storageUrl'] = $uri . '&uid=' . $storage['uid'];

            return $storage;
        }, $this->storagesProvider->getFormattedStoragesForUser());
    }

    /**
     * {@inheritdoc}
     */
    public function processSessionData($data)
    {
        if (null !== $this->expandFolder) {
            $data['expandFolder'] = $this->expandFolder;
            $store = true;
        } else {
            $this->expandFolder = $data['expandFolder'];
            $store = false;
        }
        return [$data, $store];
    }
}
