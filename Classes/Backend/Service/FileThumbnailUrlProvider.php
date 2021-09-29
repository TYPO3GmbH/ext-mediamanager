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

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ProcessedFile;
use TYPO3\CMS\Core\Utility\PathUtility;

class FileThumbnailUrlProvider implements FileThumbnailUrlProviderInterface
{
    private const THUMBNAIL_WIDTH = '490m';
    private const THUMBNAIL_HEIGHT = '300m';

    public function getThumbnailUrl(File $file): ?string
    {
        if ($file->isImage() || $file->isMediaFile()) {
            $processedFile = $file->process(
                ProcessedFile::CONTEXT_IMAGEPREVIEW,
                ['height' => self::THUMBNAIL_HEIGHT, 'width' => self::THUMBNAIL_WIDTH]
            );
            if ($processedFile) {
                return $processedFile->getPublicUrl(true);
            }
        }
        return null;
    }
}
