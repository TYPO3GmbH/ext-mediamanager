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

defined('TYPO3') or die();

(static function () {
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['constructPostProcess'][] = \TYPO3\CMS\Mediamanager\Backend\Hook\BackendControllerHook::class . '->addJavaScript';

    // copy/paste feature flag (disabled by default)
    if (!isset($GLOBALS['TYPO3_CONF_VARS']['SYS']['features'][\TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileProvider::COPY_PASTE_FEATURE_NAME])) {
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['features'][\TYPO3\CMS\Mediamanager\Backend\ContextMenu\FileProvider::COPY_PASTE_FEATURE_NAME] = false;
    }
})();
