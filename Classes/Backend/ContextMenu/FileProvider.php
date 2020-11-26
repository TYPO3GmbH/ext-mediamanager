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

namespace TYPO3\CMS\FilelistNg\Backend\ContextMenu;

use TYPO3\CMS\Backend\ContextMenu\ItemProviders\AbstractProvider;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Type\Bitmask\JsConfirmation;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FileProvider extends AbstractProvider
{
    /** @var File|Folder */
    protected $record;

    /** @var ResourceFactory */
    private $resourceFactory;

    /** @var string[][] */
    protected $itemsConfiguration = [
        'new' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.new',
            'iconIdentifier' => 'actions-document-new',
            'callbackAction' => 'createFile',
        ],
        'info' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.info',
            'iconIdentifier' => 'actions-document-info',
            'callbackAction' => 'openInfoPopUp',
        ],
        'divider' => [
            'type' => 'divider',
        ],
        'copy' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.copy',
            'iconIdentifier' => 'actions-edit-copy',
            'callbackAction' => 'copyFile',
        ],
        'copyRelease' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.copy',
            'iconIdentifier' => 'actions-edit-copy-release',
            'callbackAction' => 'copyReleaseFile',
        ],
        'cut' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.cut',
            'iconIdentifier' => 'actions-edit-cut',
            'callbackAction' => 'cutFile',
        ],
        'cutRelease' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.cutrelease',
            'iconIdentifier' => 'actions-edit-cut-release',
            'callbackAction' => 'cutReleaseFile',
        ],
        'pasteInto' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.pasteinto',
            'iconIdentifier' => 'actions-document-paste-into',
            'callbackAction' => 'pasteFileInto',
        ],
        'divider2' => [
            'type' => 'divider',
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
        $this->record = $this->resourceFactory->retrieveFileOrFolderObject($this->identifier);
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
                $canRender = $this->canShowInfo();
                break;

            //just for folders
            case 'new':
                $canRender = $this->canCreateNew();
                break;
            case 'pasteInto':
                $canRender = $this->canBePastedInto();
                break;

            //for both files and folders
            case 'copy':
                $canRender = $this->canBeCopied();
                break;
            case 'copyRelease':
                $canRender = $this->isRecordInClipboard('copy');
                break;
            case 'cut':
                $canRender = $this->canBeCut();
                break;
            case 'cutRelease':
                $canRender = $this->isRecordInClipboard('cut');
                break;
            case 'delete':
                $canRender = $this->canBeDeleted();
                break;
        }
        return $canRender;
    }

    protected function canBeDeleted(): bool
    {
        return $this->record->checkActionPermission('delete');
    }

    protected function canShowInfo(): bool
    {
        return $this->isFile();
    }

    protected function canCreateNew(): bool
    {
        return $this->isFolder() && $this->record->checkActionPermission('write');
    }

    protected function canBeCopied(): bool
    {
        return $this->record->checkActionPermission('read') && $this->record->checkActionPermission('copy') && !$this->isRecordInClipboard('copy');
    }

    protected function canBeCut(): bool
    {
        return $this->record->checkActionPermission('move') && !$this->isRecordInClipboard('cut');
    }

    protected function canBePastedInto(): bool
    {
        $elArr = $this->clipboard->elFromTable('_FILE');
        if (empty($elArr)) {
            return false;
        }

        $selItem = \reset($elArr);
        $fileOrFolderInClipBoard = $this->resourceFactory->retrieveFileOrFolderObject($selItem);

        if (false === $this->isFolder()) {
            return false;
        }

        if (false === $this->record->checkActionPermission('write')) {
            return false;
        }

        if ($fileOrFolderInClipBoard instanceof Folder) {
            return $this->foldersAreInTheSameRoot($fileOrFolderInClipBoard);
        }

        return false === $fileOrFolderInClipBoard->getStorage()->isWithinFolder($fileOrFolderInClipBoard, $this->record);
    }

    /**
     * Checks if folder and record are in the same filemount
     * Cannot copy folders between filemounts
     */
    protected function foldersAreInTheSameRoot(Folder $folderInClipBoard): bool
    {
        $recordRootFolderId = $this->record->getStorage()->getRootLevelFolder()->getCombinedIdentifier();
        $clipboardRootFolderId = $folderInClipBoard->getStorage()->getRootLevelFolder()->getCombinedIdentifier();

        return $recordRootFolderId === $clipboardRootFolderId;
    }

    protected function isRecordInClipboard(string $mode = ''): bool
    {
        if ('' !== $mode && !$this->record->checkActionPermission($mode)) {
            return false;
        }
        $isSelected = '';
        // Pseudo table name for use in the clipboard.
        $table = '_FILE';
        $uid = GeneralUtility::shortMD5($this->record->getCombinedIdentifier());
        if ('normal' === $this->clipboard->current) {
            $isSelected = $this->clipboard->isSelected($table, $uid);
        }
        return '' === $mode ? !empty($isSelected) : $isSelected === $mode;
    }

    protected function isStorageRoot(): bool
    {
        return $this->record->getIdentifier() === $this->record->getStorage()->getRootLevelFolder()->getIdentifier();
    }

    protected function isFile(): bool
    {
        return $this->record instanceof File;
    }

    protected function isFolder(): bool
    {
        return $this->record instanceof Folder;
    }

    protected function getAdditionalAttributes(string $itemName): array
    {
        $attributes = [
            'data-callback-module' => 'TYPO3/CMS/Filelist/ContextMenuActions',
        ];
        if ('delete' === $itemName && $this->backendUser->jsConfirmation(JsConfirmation::DELETE)) {
            $recordTitle = GeneralUtility::fixed_lgd_cs($this->record->getName(), $this->backendUser->uc['titleLen']);

            $title = $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:delete');
            $confirmMessage = \sprintf(
                $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.delete'),
                $recordTitle
            );
            if ($this->isFolder()) {
                $confirmMessage .= BackendUtility::referenceCount(
                    '_FILE',
                    $this->record->getIdentifier(),
                    ' ' . $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:labels.referencesToFolder')
                );
            } else {
                $confirmMessage .= BackendUtility::referenceCount(
                    'sys_file',
                    (string) $this->record->getUid(),
                    ' ' . $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:labels.referencesToFile')
                );
            }
            $closeText = $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.cancel');
            $deleteText = $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.delete');
            $attributes += [
                'data-title' => \htmlspecialchars($title),
                'data-message' => \htmlspecialchars($confirmMessage),
                'data-button-close-text' => \htmlspecialchars($closeText),
                'data-button-ok-text' => \htmlspecialchars($deleteText),
            ];
        }
        if ('pasteInto' === $itemName && $this->backendUser->jsConfirmation(JsConfirmation::COPY_MOVE_PASTE)) {
            $elArr = $this->clipboard->elFromTable('_FILE');
            $selItem = \reset($elArr);

            $fileOrFolderInClipBoard = $this->resourceFactory->retrieveFileOrFolderObject($selItem);

            if (null === $fileOrFolderInClipBoard) {
                return $attributes;
            }

            $title = $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:clip_paste');

            $confirmMessage = \sprintf(
                $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.'
                    . ('copy' === $this->clipboard->currentMode() ? 'copy' : 'move') . '_into'),
                $fileOrFolderInClipBoard->getName(),
                $this->record->getName()
            );
            $closeText = $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:button.cancel');
            $okLabel = 'copy' === $this->clipboard->currentMode() ? 'copy' : 'pasteinto';
            $okText = $this->languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:cm.' . $okLabel);
            $attributes += [
                'data-title' => \htmlspecialchars($title),
                'data-message' => \htmlspecialchars($confirmMessage),
                'data-button-close-text' => \htmlspecialchars($closeText),
                'data-button-ok-text' => \htmlspecialchars($okText),
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
        return $this->record->getCombinedIdentifier();
    }
}
