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

namespace TYPO3\CMS\FilelistNg\Backend\Storage;

use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Resource\ResourceStorage;
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;

class StoragesProvider implements StoragesProviderInterface
{
    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var IconFactory */
    private $iconFactory;

    public function __construct(
        BackendUserProvider $backendUserProvider,
        IconFactory $iconFactory
    ) {
        $this->backendUserProvider = $backendUserProvider;
        $this->iconFactory = $iconFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function getStoragesForUser(): array
    {
        return \array_values(
            $this->backendUserProvider->getBackendUser()->getFileStorages()
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getFormattedStoragesForUser(): array
    {
        return \array_map(function ($storage) {
            $storageIcon =  $this->iconFactory->getIconForResource(
                $storage->getRootLevelFolder(),
                Icon::SIZE_SMALL,
                null,
                ['mount-root' => true]
            );

            return [
                'uid' => $storage->getUid(),
                'name' => $storage->getName(),
                'icon' => $storageIcon->getMarkup(),
                'type' => $storage->getDriverType(),
            ];
        }, $this->getStoragesForUser());
    }

    public function getStorageForUserById(int $storageId): ?ResourceStorage
    {
        $storages = $this->getStoragesForUser();

        $filteredStorages = \array_filter($storages, static function ($storage) use ($storageId) {
            return $storage->getUid() === $storageId;
        });

        return 1 === \count($filteredStorages) ? \current($filteredStorages) : null;
    }
}
