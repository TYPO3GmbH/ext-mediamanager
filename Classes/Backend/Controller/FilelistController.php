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

namespace TYPO3\CMS\FilelistNg\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\FilelistNg\Backend\Service\AppConfigProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\Storage\StorageProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\View\BackendTemplateView;

class FilelistController
{
    /** @var BackendTemplateView */
    private $view;

    /** @var UriBuilder */
    private $uriBuilder;

    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var IconFactory */
    private $iconFactory;

    /** @var AppConfigProviderInterface */
    private $appConfigProvider;

    /** @var StorageProviderInterface */
    private $storageProvider;

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder,
        BackendUserProvider $backendUserProvider,
        IconFactory $iconFactory,
        AppConfigProviderInterface $appConfigProvider,
        StorageProviderInterface $storageProvider
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->backendUserProvider = $backendUserProvider;
        $this->view->initializeView();
        $this->iconFactory = $iconFactory;
        $this->storageProvider = $storageProvider;
        $this->appConfigProvider = $appConfigProvider;
    }

    public function indexAction(): ResponseInterface
    {
        $storages = $this->getStoragesData();
        $backendUser = $this->backendUserProvider->getBackendUser();

        $fileListUrl = $this->uriBuilder->buildUriFromRoutePath('/module/file/CmsFilelistNg');

        $backendUrls = [];

        if ($backendUser->check('tables_modify', 'sys_file_storage')) {
            $backendUrls['newStorageUrl'] = (string) $this->uriBuilder->buildUriFromRoute('record_edit', [
                'edit[sys_file_storage][0]' => 'new',
                'returnUrl' => (string) $fileListUrl,
            ]);
        }

        if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('beuser') && $backendUser->check('module', 'beuser')) {
            $backendUrls['switchUserUrl'] = (string) $this->uriBuilder->buildUriFromRoute('system_BeuserTxBeuser');
        }

        $this->addGlobalVars($backendUrls);
        $this->view->assign('storagesJson', \json_encode(\array_values($storages)));
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
            'fileActionUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_file_process'),
            'treeUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_tree_fetchData', ['uid' => $storageUid]),
            'flashMessagesUrl' =>  (string) $this->uriBuilder->buildUriFromRoute('ajax_flashmessages_render'),
            'clipboardUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_contextmenu_clipboard'),
            'downloadFilesUrl' => (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_download_files'),
            'editFileStorageUrl' => (string) $this->uriBuilder->buildUriFromRoute('record_edit'),
            'searchFilesUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_search_files', ['uid' => $storageUid]),
        ]);
        $this->view->assign('storagesJson', \json_encode(\array_values($storages)));
        $this->view->assign('selectedStorageUid', (int) $storageUid);

        return new HtmlResponse($this->view->render());
    }

    /**
     * @return mixed[]
     */
    private function getStoragesData(): array
    {
        return \array_map(function ($storage) {
            $storageIcon =  $this->iconFactory->getIconForResource(
                $storage->getRootLevelFolder(),
                Icon::SIZE_SMALL,
                null,
                ['mount-root' => true]
            );

            return [
                'uid' => $storage->getUid(),
                'name' => $storage->getName(),
                'storageUrl' => (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_storage', ['uid' => $storage->getUid()]),
                'icon' => $storageIcon->getMarkup(),
                'type' => $storage->getDriverType(),
            ];
        }, $this->storageProvider->getStoragesForUser());
    }

    private function addGlobalVars(array $backendUrls): void
    {
        $appConfig = $this->appConfigProvider->getConfig();
        $appConfig['backendUrls'] = $backendUrls;

        $this->view->assign('app', \json_encode($appConfig));
    }
}
