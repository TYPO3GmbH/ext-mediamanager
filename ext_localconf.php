<?php

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

defined('TYPO3_MODE') or die();

(static function () {
    // use same keys as provider in public/typo3/sysext/filelist/ext_localconf.php to override them
    $GLOBALS['TYPO3_CONF_VARS']['BE']['ContextMenu']['ItemProviders'][1486418731] = \TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileProvider::class;
    $GLOBALS['TYPO3_CONF_VARS']['BE']['ContextMenu']['ItemProviders'][1486418732] = \TYPO3\CMS\Mediamanager\Backend\ContextMenu\FilemountsProvider::class;
    $GLOBALS['TYPO3_CONF_VARS']['BE']['ContextMenu']['ItemProviders'][1486418733] = \TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileStorageProvider::class;

    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['constructPostProcess'][] = \TYPO3\CMS\Mediamanager\Backend\Hook\BackendControllerHook::class . '->addJavaScript';

    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ElementBrowsers']['file'] = \TYPO3\CMS\Mediamanager\Backend\Browser\FileBrowser::class;
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['ElementBrowsers']['folder'] = \TYPO3\CMS\Mediamanager\Backend\Browser\FolderBrowser::class;

    $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Backend\Clipboard\Clipboard::class] = [
        'className' => \TYPO3\CMS\Mediamanager\Backend\Clipboard\MediamanagerAwareClipboard::class,
    ];

    // copy/paste feature flag (disabled by default)
    if (!isset($GLOBALS['TYPO3_CONF_VARS']['SYS']['features'][\TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileProvider::COPY_PASTE_FEATURE_NAME])) {
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['features'][\TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileProvider::COPY_PASTE_FEATURE_NAME] = false;
    }
})();
