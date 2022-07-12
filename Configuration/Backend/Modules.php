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

return [
    'file_mediamanager' => [
        'parent' => 'file',
        'access' => 'user,group',
        'workspaces' => 'online,custom',
        'path' => '/module/file/Mediamanager',
        'labels' => 'LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf',
        'extensionName' => 'Mediamanager',
        'iconIdentifier' => 'module-mediamanager',
        'inheritNavigationComponentFromMainModule' => false,
        'routes' => [
            '_default' => [
                'target' =>  \TYPO3\CMS\Mediamanager\Backend\Controller\MediamanagerController::class . '::indexAction',
            ],
        ],
    ],
];
