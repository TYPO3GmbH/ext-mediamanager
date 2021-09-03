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

namespace TYPO3\CMS\Mediamanager\Backend\Service;

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

        $translationKeys = [
            'new' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.new',
            'upload' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.upload',
            'download' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:cm.download',
            'delete' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.delete',
            'moveTo' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:cm.moveto',
            'copyTo' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:cm.copyto',
            'undo' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:cm.undo',
            'view.sorting' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:view.sorting',
            'view.sortingdir.asc' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:view.sortingdir.asc',
            'view.sortingdir.desc' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:view.sortingdir.desc',
            'view.mode' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:view.mode',
            'view.mode.list' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:view.mode.list',
            'view.mode.tiles' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:view.mode.tiles',
            'field.path' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.path',
            'field.name' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.name',
            'field.modified' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.modified',
            'field.size' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.size',
            'field.type' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.type',
            'field.variants' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.variants',
            'field.references' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.references',
            'field.rw' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:field.rw',
            'dnd.move.message' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dnd.move.message',
            'dnd.copy.message' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dnd.copy.message',
            'dnd.move.title' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dnd.move.title',
            'dnd.copy.title' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dnd.copy.title',
            'selected' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:selected',
            'modal.move.title' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:modal.move.title',
            'modal.copy.title' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:modal.copy.title',
            'modal.move.message' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:modal.move.message',
            'modal.copy.message' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:modal.copy.message',
            'modal.move.button' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:modal.move.button',
            'modal.copy.button' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:modal.copy.button',
            'emptyFolder' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:emptyFolder',
            'readOnlyFolder' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:readOnlyFolder',
            'dragFiles.message.upload' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dragFiles.message.upload',
            'dragFiles.allowed.header' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dragFiles.allowed.header',
            'dragFiles.allowed.message' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dragFiles.allowed.message',
            'dragFiles.denied.header' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dragFiles.denied.header',
            'dragFiles.denied.message' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:dragFiles.denied.message',
            'selectStorageInfo' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:selectStorageInfo',
            'storagesAccessDeniedTitle' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:storagesAccessDeniedTitle',
            'storagesAccessDeniedMessage' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:storagesAccessDeniedMessage',
            'userName' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.refresh_login_username',
            'storagesAccessDeniedSwitchUser' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:storagesAccessDeniedSwitchUser',
            'storagesAccessDeniedRefresh' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:storagesAccessDeniedRefresh',
            'myStorages' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:myStorages',
            'deleteConfirmHeadline' => 'LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:delete',
            'deleteConfirmMessage' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.delete',
            'button.cancel' => 'LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.cancel',
            'button.delete' => 'LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.delete',
            'message.header.fileDeleted' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:message.header.fileDeleted',
            'message.header.filesMoved' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.filesMoved',
            'message.header.filesCopied' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.filesCopied',
            'message.header.folderCreated' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.folderCreated',
            'message.header.filesUploaded' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.filesUploaded',
            'message.header.fileRenamed' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.fileRenamed',
            'message.header.folderRenamed' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.folderRenamed',
            'message.header.undo' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.undo',
            'message.header.genericError' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:message.header.genericError',
            'labels.search' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:labels.search',
            'fileSearch.noResults' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:fileSearch.noResults',
            'fileTree.collapse' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:fileTree.collapse',
            'fileTree.expand' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:fileTree.expand',
            'file_replace.pagetitle' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_replace.pagetitle',
            'file_replace.selectfile' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_replace.selectfile',
            'file_replace.keepfiletitle' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_replace.keepfiletitle',
            'file_replace.submit' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_replace.submit',
            'file_browser.button.insert' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_browser.button.insert',
            'file_browser.title' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_browser.title',
            'cm.allowedFileExtensions' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.allowedFileExtensions',
            'file_browser.fileNotAllowed' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_browser.fileNotAllowed',
            'file_browser.fileAdded' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:file_browser.fileAdded',
            'folder_browser.button.insert' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:folder_browser.button.insert',
            'folder_browser.title' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:folder_browser.title',
            'folder_browser.fileNotAllowed' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:folder_browser.fileNotAllowed',
            'folder_browser.folderAdded' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:folder_browser.folderAdded',
            'file_upload.existingfiles.title' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:file_upload.existingfiles.title',
            'file_upload.button.continue' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:file_upload.button.continue',
            'labels.refresh' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:labels.refresh',
        ];

        return array_map(static function ($key) use ($languageService) {
            return $languageService->sl($key);
        }, $translationKeys);
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
            'actions-circle' => 'actions-circle',
            'actions-check-circle-alt' => 'actions-check-circle-alt',
            'actions-chevron-left' => 'actions-chevron-left',
            'actions-chevron-right' => 'actions-chevron-right',
            'actions-sort-amount-down' => 'actions-sort-amount-down',
            'actions-sort-amount-up' => 'actions-sort-amount-up',
            'actions-info-circle-alt' => 'actions-info-circle-alt',
        ];

        return array_map(function (string $identifier) {
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
