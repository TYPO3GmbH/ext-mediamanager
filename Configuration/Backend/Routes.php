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
    'mediamanager_storage' => [
        'path' => '/mediamanager/storage',
        'access' => 'public',
        'target' =>  Controller\MediamanagerController::class . '::storageAction',
    ],
    'mediamanager_download_files' => [
        'path' => '/mediamanager/download-files',
        'target' => Controller\DownloadFilesController::class . '::downloadAction',
    ],
];
