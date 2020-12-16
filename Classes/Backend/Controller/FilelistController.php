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
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\Service\IconUrlProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\LanguageServiceProvider;
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

    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    /** @var IconUrlProviderInterface */
    private $iconUrlProvider;

    /** @var StorageProviderInterface */
    private $storageProvider;

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder,
        BackendUserProvider $backendUserProvider,
        IconFactory $iconFactory,
        LanguageServiceProvider $languageServiceProvider,
        IconUrlProviderInterface $iconUrlProvider,
        StorageProviderInterface $storageProvider
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->backendUserProvider = $backendUserProvider;
        $this->view->initializeView();
        $this->iconFactory = $iconFactory;
        $this->languageServiceProvider = $languageServiceProvider;
        $this->iconUrlProvider = $iconUrlProvider;
        $this->storageProvider = $storageProvider;
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
        $appConfig = [
            'translations' => $this->getTranslations(),
            'iconUrls' => $this->getIconUrls(),
            'backendUrls' => $backendUrls,
        ];

        $this->view->assign('app', \json_encode($appConfig));
    }

    /**
     * @return string[]
     */
    private function getTranslations(): array
    {
        $languageService = $this->languageServiceProvider->getLanguageService();

        return [
            'new' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.new'),
            'upload' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.upload'),
            'download' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:cm.download'),
            'delete' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.delete'),
            'moveTo' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:cm.moveto'),
            'copyTo' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:cm.copyto'),
            'undo' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:cm.undo'),
            'view.sorting' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:view.sorting'),
            'view.sortingdir.asc' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:view.sortingdir.asc'),
            'view.sortingdir.desc' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:view.sortingdir.desc'),
            'view.mode' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:view.mode'),
            'view.mode.list' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:view.mode.list'),
            'view.mode.tiles' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:view.mode.tiles'),
            'field.name' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.name'),
            'field.modified' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.modified'),
            'field.size' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.size'),
            'field.type' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.type'),
            'field.variants' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.variants'),
            'field.references' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.references'),
            'field.rw' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.rw'),
            'dnd.move.message' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dnd.move.message'),
            'dnd.copy.message' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dnd.copy.message'),
            'dnd.move.title' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dnd.move.title'),
            'dnd.copy.title' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dnd.copy.title'),
            'selected' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:selected'),
            'modal.move.title' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:modal.move.title'),
            'modal.copy.title' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:modal.copy.title'),
            'modal.move.message' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:modal.move.message'),
            'modal.copy.message' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:modal.copy.message'),
            'modal.move.button' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:modal.move.button'),
            'modal.copy.button' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:modal.copy.button'),
            'emptyFolder' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:emptyFolder'),
            'readOnlyFolder' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:readOnlyFolder'),
            'dragFiles.message.upload' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dragFiles.message.upload'),
            'dragFiles.allowed.header' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dragFiles.allowed.header'),
            'dragFiles.allowed.message' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dragFiles.allowed.message'),
            'dragFiles.denied.header' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dragFiles.denied.header'),
            'dragFiles.denied.message' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dragFiles.denied.message'),
            'selectStorageInfo' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:selectStorageInfo'),
            'storagesAccessDeniedTitle' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:storagesAccessDeniedTitle'),
            'storagesAccessDeniedMessage' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:storagesAccessDeniedMessage'),
            'userName' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.refresh_login_username'),
            'storagesAccessDeniedSwitchUser' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:storagesAccessDeniedSwitchUser'),
            'storagesAccessDeniedRefresh' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:storagesAccessDeniedRefresh'),
            'myStorages' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:myStorages'),
            'deleteConfirmHeadline' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:delete'),
            'deleteConfirmMessage' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.delete'),
            'deleteConfirmCancelButton' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.cancel'),
            'deleteConfirmSubmitButton' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.delete'),
            'message.header.fileDeleted' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:message.header.fileDeleted'),
            'message.header.filesMoved' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.filesMoved'),
            'message.header.filesCopied' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.filesCopied'),
            'message.header.folderCreated' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.folderCreated'),
            'message.header.filesUploaded' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.filesUploaded'),
            'message.header.fileRenamed' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.fileRenamed'),
            'message.header.folderRenamed' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.folderRenamed'),
            'message.header.undo' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.undo'),
            'message.header.genericError' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:message.header.genericError'),
            'labels.search' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:labels.search'),
            'fileSearch.noResults' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:fileSearch.noResults'),
            'fileTree.collapse' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:fileTree.collapse'),
            'fileTree.expand' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:fileTree.expand'),
        ];
    }

    /**
     * @return string[]
     */
    private function getIconUrls(): array
    {
        $iconIdentifiers = [
            'addFolder' => 'actions-folder-add',
            'upload' => 'actions-edit-upload',
            'download' => 'actions-download',
            'delete' => 'actions-delete',
            'moveTo' => 'actions-move',
            'copyTo' => 'actions-clipboard',
            'view.sorting' => 'actions-sort-amount-down',
            'view.mode' => 'actions-table',
            'view.mode.list' => 'actions-viewmode-list',
            'view.mode.tiles' => 'actions-viewmode-tiles',
            'emptyFolder' =>  'apps-pagetree-folder-default',
            'refresh' => 'actions-refresh',
            'search' => 'actions-search',
            'lockedFolder' => 'apps-filetree-folder-locked',
            'reset' => 'actions-close',
            'toggleTree' => 'apps-pagetree-category-expand-all',
            'checkmark' => 'actions-check',
        ];

        return \array_map(function (string $identifier) {
            $icon = $this->iconFactory->getIcon($identifier);
            return $this->iconUrlProvider->getUrl($icon);
        }, $iconIdentifiers);
    }
}
