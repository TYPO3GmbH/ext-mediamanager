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

use TYPO3\CMS\Mediamanager\Backend\Controller;

return [
    // Get data for page tree
    'mediamanager_tree_fetchData' => [
        'path' => '/mediamanager/tree/fetchData',
        'target' => Controller\FolderTreeController::class . '::fetchDataAction',
    ],
    'mediamanager_folder_fetchData' => [
        'path' => '/mediamanager/folder/fetchData',
        'target' => Controller\FolderDetailController::class . '::fetchDataAction',
    ],
    'mediamanager_search_files' => [
        'path' => '/mediamanager/searchFiles',
        'target' => Controller\SearchFilesController::class . '::searchFilesAction',
    ],
];
