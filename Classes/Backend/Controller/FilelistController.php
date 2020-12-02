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
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\Service\IconUrlProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\LanguageServiceProvider;
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

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder,
        BackendUserProvider $backendUserProvider,
        IconFactory $iconFactory,
        LanguageServiceProvider $languageServiceProvider,
        IconUrlProviderInterface $iconUrlProvider
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->backendUserProvider = $backendUserProvider;
        $this->view->initializeView();
        $this->iconFactory = $iconFactory;
        $this->languageServiceProvider = $languageServiceProvider;
        $this->iconUrlProvider = $iconUrlProvider;
    }

    public function indexAction(): ResponseInterface
    {
        $this->view->assign('storages', $this->getStoragesData());
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

        $ajaxTreeUrl = $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_tree_fetchData', ['uid' => $storageUid]);

        $this->view->assign('storagesJson', \json_encode(\array_values($storages)));
        $this->view->assign('selectedStorageUid', (int) $storageUid);
        $this->view->assign('fileActionUrl', (string) $this->uriBuilder->buildUriFromRoute('ajax_file_process'));
        $this->view->assign('treeUrl', (string) $ajaxTreeUrl);
        $this->view->assign('flashMessagesUrl', (string) $this->uriBuilder->buildUriFromRoute('ajax_flashmessages_render'));
        $this->view->assign('clipboardUrl', (string) $this->uriBuilder->buildUriFromRoute('ajax_contextmenu_clipboard'));
        $this->view->assign('downloadFilesUrl', (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_download_files'));

        $this->view->assign('translations', \json_encode($this->getTranslations()));
        $this->view->assign('iconUrls', \json_encode($this->getIconUrls()));

        return new HtmlResponse($this->view->render());
    }

    /**
     * @return mixed[]
     */
    private function getStoragesData(): array
    {
        return \array_map(function ($storage) {
            return [
                'uid' => $storage->getUid(),
                'name' => $storage->getName(),
                'storageUrl' => (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_storage', ['uid' => $storage->getUid()]),
                'icon' => $this->iconFactory->getIconForResource($storage->getRootLevelFolder())->getMarkup(),
            ];
        }, $this->backendUserProvider->getBackendUser()->getFileStorages());
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
            'dragFilesUploadMessage' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:dragFilesUploadMessage'),
        ];
    }

    /**
     * @return string[]
     */
    private function getIconUrls(): array
    {
        $iconIdentifiers = [
            'new' => 'actions-document-new',
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
        ];

        return \array_map(function (string $identifier) {
            $icon = $this->iconFactory->getIcon($identifier);
            return $this->iconUrlProvider->getUrl($icon);
        }, $iconIdentifiers);
    }
}
