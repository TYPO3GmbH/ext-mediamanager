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

use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceInterface;

class ArchiveGenerator implements ArchiveGeneratorInterface
{
    /**
     * {@inheritdoc}
     */
    public function generateArchive($resources = []): string
    {
        $name = \tempnam(\sys_get_temp_dir(), 'zip');
        $zipArchive = new \ZipArchive();
        $zipArchive->open($name);

        foreach ($resources as $resource) {
            $this->addResourceToArchive($resource, $zipArchive, $resource->getParentFolder()->getName());
        }
        $zipArchive->close();

        return $name;
    }

    private function addResourceToArchive(ResourceInterface $resource, \ZipArchive $zipArchive, string $directory): void
    {
        if (false === $resource->checkActionPermission('read')) {
            return;
        }

        $path = $directory . DIRECTORY_SEPARATOR . $resource->getName();

        switch (true) {
            case $resource instanceof FileInterface:
                $zipArchive->addFromString($path, $resource->getContents());
                break;
            case $resource instanceof Folder:
                foreach ($resource->getSubfolders() as $subfolder) {
                    $this->addResourceToArchive($subfolder, $zipArchive, $path);
                }
                foreach ($resource->getFiles() as $file) {
                    $this->addResourceToArchive($file, $zipArchive, $path);
                }
                break;
        }
    }
}
