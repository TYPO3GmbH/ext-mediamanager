<?php
defined('TYPO3_MODE') or die();

(static function () {
    // use same keys as provider in public/typo3/sysext/filelist/ext_localconf.php to override them
    $GLOBALS['TYPO3_CONF_VARS']['BE']['ContextMenu']['ItemProviders'][1486418731] = \TYPO3\CMS\FilelistNg\Backend\ContextMenu\FileProvider::class;
    $GLOBALS['TYPO3_CONF_VARS']['BE']['ContextMenu']['ItemProviders'][1486418732] = \TYPO3\CMS\FilelistNg\Backend\ContextMenu\FilemountsProvider::class;
    $GLOBALS['TYPO3_CONF_VARS']['BE']['ContextMenu']['ItemProviders'][1486418733] = \TYPO3\CMS\FilelistNg\Backend\ContextMenu\FileStorageProvider::class;
})();