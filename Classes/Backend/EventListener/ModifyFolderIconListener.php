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

namespace TYPO3\CMS\Mediamanager\Backend\EventListener;

use TYPO3\CMS\Core\Imaging\Event\ModifyIconForResourcePropertiesEvent;
use TYPO3\CMS\Core\Resource\Folder;

class ModifyFolderIconListener
{
    private const DEFAULT_ICON_FOLDER = 'apps-filetree-folder-default';

    public function __invoke(ModifyIconForResourcePropertiesEvent $event): void
    {
        if (!$event->getResource() instanceof Folder) {
            return;
        }

        if (self::DEFAULT_ICON_FOLDER !== $event->getIconIdentifier()) {
            return;
        }

        $folder = $event->getResource();
        $iconIdentifier = 'files-folder';
        if ($folder->getFileCount() > 0 || count($folder->getSubfolders()) > 0) {
            $iconIdentifier = 'files-folder-content';
        }

        $event->setIconIdentifier($iconIdentifier);
    }
}
