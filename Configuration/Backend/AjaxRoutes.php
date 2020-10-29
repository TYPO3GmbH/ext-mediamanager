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

use TYPO3\CMS\FilelistNg\Backend\Controller;

return [
    // Get data for page tree
    'filelist_ng_tree_fetchData' => [
        'path' => '/filelist_ng/tree/fetchData',
        'target' => Controller\FolderTreeController::class . '::fetchDataAction',
    ],
    'filelist_ng_folder_fetchData' => [
        'path' => '/filelist_ng/folder/fetchData',
        'target' => Controller\FolderDetailController::class . '::fetchDataAction',
    ],
];
