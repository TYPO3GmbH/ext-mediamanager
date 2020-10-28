<?php

defined('TYPO3_MODE') or die();

//\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerModule(
//    'CmsFilelistNg',
//    'file',
//    'list_ng',
//    'bottom',
//    [
//        \TYPO3\CMS\FilelistNg\Backend\Controller\FilelistController::class => 'index',
//    ],
//    [
//        'access' => 'user,group',
//        'workspaces' => 'online,custom',
//        'icon' => 'EXT:cms_filelist_ng/Resources/Public/Icons/module-filelist-ng.svg',
//        'labels' => 'LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf',
//        'navigationComponentId' => null,
//        'inheritNavigationComponentFromMainModule' => false,
//    ]
//);


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
