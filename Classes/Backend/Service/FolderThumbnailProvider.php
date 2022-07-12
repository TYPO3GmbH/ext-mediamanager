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

namespace TYPO3\CMS\Mediamanager\Backend\Service;

use TYPO3\CMS\Core\Resource\Folder;

class FolderThumbnailProvider implements FolderThumbnailProviderInterface
{
    /** @var FileThumbnailUrlProviderInterface */
    private $fileThumbnailUrlProvider;

    public function __construct(FileThumbnailUrlProviderInterface $fileThumbnailUrlProvider)
    {
        $this->fileThumbnailUrlProvider = $fileThumbnailUrlProvider;
    }

    public function getFolderThumbnailIcon(Folder $folder): ?string
    {
        $thumbnailUrl = $this->getFolderThumbnailUrl($folder);

        if ($thumbnailUrl === null) {
            return null;
        }

        $id = uniqid('', true);

        return <<<HTML
            <svg class="icon-color" role="img">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                    <path fill="#E8A33D" fill-rule="evenodd" d="M64 16H32l-6-6H0v44h64V16z"/>
                    <path fill="url(#{$id})" d="M2 12h60v40H2z"></path>
                    <path fill="#FFC857" fill-rule="evenodd" d="M0 48h26l6-6h32v12H0v-6z"/>
                </svg>
                <defs>
                    <pattern  id="$id" width="1" height="1">
                        <image width="60" height="40" preserveAspectRatio="xMidYMid slice" href="{$thumbnailUrl}" />
                    </pattern>
                </defs>
            </svg>
HTML;
    }

    protected function getFolderThumbnailUrl(Folder $folder): ?string
    {
        foreach ($folder->getFiles() as $file) {
            $thumbnailUrl = $this->fileThumbnailUrlProvider->getThumbnailUrl($file);

            if ($thumbnailUrl !== null) {
                return $thumbnailUrl;
            }
        }
        return null;
    }
}
