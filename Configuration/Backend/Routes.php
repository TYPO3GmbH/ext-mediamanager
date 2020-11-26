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
    'filelist_ng_storage' => [
        'path' => '/filelist_ng/storage',
        'access' => 'public',
        'target' =>  Controller\FilelistController::class . '::storageAction',
    ],
    'filelist_ng_download_files' => [
        'path' => '/filelist_ng/download-files',
        'target' => Controller\DownloadFilesController::class . '::downloadAction',
    ],
];
