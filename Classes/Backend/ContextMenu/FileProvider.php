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

namespace TYPO3\CMS\Mediamanager\Backend\ContextMenu;

use TYPO3\CMS\Backend\ContextMenu\ItemProviders\AbstractProvider;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Resource\ResourceInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3\CMS\Mediamanager\Backend\Clipboard\MediamanagerAwareClipboard;

class FileProvider extends AbstractProvider
{
    /** @var File|Folder[] */
    protected $records = [];

    /** @var ResourceFactory */
    private $resourceFactory;

    /** @var string[][] */
    protected $itemsConfiguration = [
        'new' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.new',
            'iconIdentifier' => 'actions-folder-add',
            'callbackAction' => 'addFolder',
        ],
        'info' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.info',
            'iconIdentifier' => 'actions-document-info',
            'callbackAction' => 'openInfoPopUp',
        ],
        'show' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.view',
            'iconIdentifier' => 'actions-eye',
            'callbackAction' => 'showFile',
        ],
        'download' => [
            'label' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:cm.download',
            'iconIdentifier' => 'actions-download',
            'callbackAction' => 'download',
        ],
        'divider' => [
            'type' => 'divider',
        ],
        'copy' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.copy',
            'iconIdentifier' => 'actions-edit-copy',
            'callbackAction' => 'copyFile',
        ],
        'cut' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.cut',
            'iconIdentifier' => 'actions-edit-cut',
            'callbackAction' => 'cutFile',
        ],
        'pasteInto' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.pasteinto',
            'iconIdentifier' => 'actions-document-paste-into',
            'callbackAction' => 'pasteFileInto',
        ],
        'divider2' => [
            'type' => 'divider',
        ],
        'replace' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.replace',
            'iconIdentifier' => 'actions-replace',
            'callbackAction' => 'replaceFile',
        ],
        'delete' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.delete',
            'iconIdentifier' => 'actions-edit-delete',
            'callbackAction' => 'deleteFile',
        ],
    ];

    public function canHandle(): bool
    {
        return 'sys_file' === $this->table;
    }

    protected function initialize()
    {
        parent::initialize();

        $this->resourceFactory = GeneralUtility::makeInstance(ResourceFactory::class);

        $identifiers = \json_decode($this->identifier, true);
        $this->records = \array_map(
            function ($identifier) {
                return $this->resourceFactory->retrieveFileOrFolderObject($identifier);
            },
            $identifiers
        );
    }

    protected function canRender(string $itemName, string $type): bool
    {
        if (\in_array($type, ['divider', 'submenu'], true)) {
            return true;
        }
        if (\in_array($itemName, $this->disabledItems, true)) {
            return false;
        }
        $canRender = false;
        switch ($itemName) {
            //just for files
            case 'info':
            case 'show':
                $canRender = $this->canShowInfo();
                break;
            case 'replace':
                $canRender = $this->canReplace();
                break;

            //just for folders
            case 'new':
                $canRender = $this->canCreateNew();
                break;
            case 'pasteInto':
                $canRender = $this->canBePastedInto();
                break;

            //for both files and folders
            case 'download':
                $canRender = $this->canDownload();
                break;
            case 'copy':
                $canRender = $this->canBeCopied();
                break;
            case 'cut':
                $canRender = $this->canBeCut();
                break;
            case 'delete':
                $canRender = $this->canBeDeleted();
                break;
        }
        return $canRender;
    }

    protected function canBeDeleted(): bool
    {
        foreach ($this->records as $record) {
            if (false === $record->checkActionPermission('delete')) {
                return false;
            }
        }
        return true;
    }

    protected function canShowInfo(): bool
    {
        return $this->isSingleRecordMode() && $this->isFile($this->getSingleRecord());
    }

    protected function canDownload(): bool
    {
        if ('list' !== $this->context) {
            return false;
        }

        foreach ($this->records as $record) {
            if (false === $record->checkActionPermission('read')) {
                return false;
            }
        }
        return true;
    }

    protected function canReplace(): bool
    {
        return $this->isSingleRecordMode() && $this->isFile($this->getSingleRecord()) && $this->getSingleRecord()->checkActionPermission('replace');
    }

    protected function canCreateNew(): bool
    {
        return $this->isSingleRecordMode() && $this->isFolder($this->getSingleRecord()) && $this->getSingleRecord()->checkActionPermission('write') && 'tree' === $this->context;
    }

    protected function canBeCopied(): bool
    {
        return $this->getSingleRecord()->checkActionPermission('read') && $this->getSingleRecord()->checkActionPermission('copy');
    }

    protected function canBeCut(): bool
    {
        return $this->getSingleRecord()->checkActionPermission('move');
    }

    protected function canBePastedInto(): bool
    {
        if (false === $this->isSingleRecordMode()) {
            return false;
        }

        if (false === $this->isFolder($this->getSingleRecord())) {
            return false;
        }

        if (false === $this->getSingleRecord()->checkActionPermission('write')) {
            return false;
        }

        $clipboardElements = $this->clipboard->elFromTable('_FILE', MediamanagerAwareClipboard::MEDIAMANAGER_CLIPBOARD_PAD);
        if (empty($clipboardElements)) {
            return false;
        }

        foreach ($clipboardElements as $clipboardElement) {
            $fileOrFolderInClipBoard = $this->resourceFactory->retrieveFileOrFolderObject($clipboardElement);

            if (($fileOrFolderInClipBoard instanceof Folder) && false === $this->foldersAreInTheSameRoot($fileOrFolderInClipBoard)) {
                return false;
            }

            if (false !== $fileOrFolderInClipBoard->getStorage()->isWithinFolder($this->getSingleRecord(), $fileOrFolderInClipBoard)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks if folder and record are in the same filemount
     * Cannot copy folders between filemounts
     */
    protected function foldersAreInTheSameRoot(Folder $folderInClipBoard): bool
    {
        $recordRootFolderId = $this->getSingleRecord()->getStorage()->getRootLevelFolder()->getCombinedIdentifier();
        $clipboardRootFolderId = $folderInClipBoard->getStorage()->getRootLevelFolder()->getCombinedIdentifier();

        return $recordRootFolderId === $clipboardRootFolderId;
    }

    protected function isRecordInClipboard(string $mode = ''): bool
    {
        if ('' !== $mode && !$this->getSingleRecord()->checkActionPermission($mode)) {
            return false;
        }
        $isSelected = '';
        // Pseudo table name for use in the clipboard.
        $table = '_FILE';
        $uid = GeneralUtility::shortMD5($this->getSingleRecord()->getCombinedIdentifier());
        if ('normal' === $this->clipboard->current) {
            $isSelected = $this->clipboard->isSelected($table, $uid);
        }
        return '' === $mode ? !empty($isSelected) : $isSelected === $mode;
    }

    protected function isStorageRoot(): bool
    {
        return $this->getSingleRecord()->getIdentifier() === $this->getSingleRecord()->getStorage()->getRootLevelFolder()->getIdentifier();
    }

    protected function isFile(ResourceInterface $resource): bool
    {
        return $resource instanceof File;
    }

    protected function isFolder(ResourceInterface $resource): bool
    {
        return $resource instanceof Folder;
    }

    protected function getAdditionalAttributes(string $itemName): array
    {
        $attributes = [];

        if ('show' === $itemName) {
            $attributes += [
                'data-url' => PathUtility::getAbsoluteWebPath($this->getSingleRecord()->getPublicUrl(true)),
            ];
        }

        return $attributes;
    }

    public function getPriority(): int
    {
        // use higher priority than default filelist module
        return 150;
    }

    protected function getIdentifier(): string
    {
        return $this->getSingleRecord()->getCombinedIdentifier();
    }

    /**
     * @return File|Folder
     */
    private function getSingleRecord(): ResourceInterface
    {
        return $this->records[0];
    }

    private function isSingleRecordMode(): bool
    {
        return \count($this->records) === 1;
    }
}
