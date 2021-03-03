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

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceInterface;
use TYPO3\CMS\Core\SingletonInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class ResourcesDeleteHelper implements ResourcesDeleteHelperInterface, SingletonInterface
{
    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    public function __construct(
        LanguageServiceProvider $languageServiceProvider,
        BackendUserProvider $backendUserProvider
    ) {
        $this->languageServiceProvider = $languageServiceProvider;
        $this->backendUserProvider = $backendUserProvider;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfirmMessage(array $resources): string
    {
        $languageService = $this->languageServiceProvider->getLanguageService();

        if (0 === count($resources)) {
            return '';
        }

        if (1 === count($resources)) {
            return \sprintf(
                $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:mess.delete'),
                $this->getDisplayResourceName($resources[0])
            ) . $this->getReferenceString($resources[0]);
        }

        $confirmMessage = $languageService->sl('LLL:EXT:mediamanager/Resources/Private/Language/locallang_mod_mediamanager.xlf:mess.multi_delete');

        $resourcesList = array_map(function (ResourceInterface $resource) {
            return '\'' . $this->getDisplayResourceName($resource) . '\'' . $this->getReferenceString($resource);
        }, $resources);

        return $confirmMessage . "\n" . implode("\n", $resourcesList);
    }

    protected function getDisplayResourceName(ResourceInterface $resource): string
    {
        $backendUser = $this->backendUserProvider->getBackendUser();
        return GeneralUtility::fixed_lgd_cs($resource->getName(), $backendUser->uc['titleLen']);
    }

    protected function getReferenceString(ResourceInterface $resource): string
    {
        $languageService = $this->languageServiceProvider->getLanguageService();
        switch (true) {
           case $resource instanceof Folder:
               return BackendUtility::referenceCount(
                   '_FILE',
                   $resource->getIdentifier(),
                   ' ' . $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:labels.referencesToFolder')
               );

           case $resource instanceof File:
               return BackendUtility::referenceCount(
                   'sys_file',
                   (string)$resource->getUid(),
                   ' ' . $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:labels.referencesToFile')
               );

           default:
               return '';
       }
    }
}
