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
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addModule(
        'file',
        'CmsFilelistNg',
        'bottom',
        null,
        [
            'name' => 'file_CmsFilelistNg',
            'routeTarget' => \TYPO3\CMS\FilelistNg\Backend\Controller\FilelistController::class . '::indexAction',
            'access' => 'user,group',
            'workspaces' => 'online,custom',
            'icon' => 'EXT:cms_filelist_ng/Resources/Public/Icons/module-filelist-ng.svg',
            'labels' => 'LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf',
            'navigationComponentId' => null,
            'inheritNavigationComponentFromMainModule' => false,
        ]
    );
})();
