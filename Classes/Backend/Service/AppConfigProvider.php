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

namespace TYPO3\CMS\FilelistNg\Backend\Service;

use TYPO3\CMS\Core\Imaging\IconFactory;

class AppConfigProvider implements AppConfigProviderInterface
{
    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    /** @var IconFactory */
    private $iconFactory;

    /** @var IconUrlProviderInterface */
    private $iconUrlProvider;

    public function __construct(
        LanguageServiceProvider $languageServiceProvider,
        IconFactory $iconFactory,
        IconUrlProviderInterface $iconUrlProvider
    ) {
        $this->languageServiceProvider = $languageServiceProvider;
        $this->iconFactory = $iconFactory;
        $this->iconUrlProvider = $iconUrlProvider;
    }

    /**
     * @return string[]
     */
    protected function getTranslations(): array
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
            'field.path' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:field.path'),
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
            'button.cancel' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.cancel'),
            'button.delete' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.delete'),
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
            'file_replace.pagetitle' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_replace.pagetitle'),
            'file_replace.selectfile' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_replace.selectfile'),
            'file_replace.keepfiletitle' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_replace.keepfiletitle'),
            'file_replace.submit' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_replace.submit'),
            'file_browser.button.insert' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_browser.button.insert'),
            'file_browser.title' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_browser.title'),
            'cm.allowedFileExtensions' => $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.allowedFileExtensions'),
            'file_browser.fileNotAllowed' => $languageService->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_browser.fileNotAllowed'),
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

    public function getConfig(): array
    {
        return [
            'translations' => $this->getTranslations(),
            'iconUrls' => $this->getIconUrls(),
        ];
    }
}
