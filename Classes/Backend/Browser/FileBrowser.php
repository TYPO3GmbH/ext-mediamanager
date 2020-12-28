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

namespace TYPO3\CMS\FilelistNg\Backend\Browser;

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\ServerRequestFactory;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3\CMS\FilelistNg\Backend\Service\AppConfigProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Service\LanguageServiceProvider;
use TYPO3\CMS\FilelistNg\Backend\Storage\StorageProviderInterface;
use TYPO3\CMS\Recordlist\Browser\ElementBrowserInterface;
use TYPO3\CMS\Recordlist\Tree\View\LinkParameterProviderInterface;

class FileBrowser implements ElementBrowserInterface, LinkParameterProviderInterface
{
    /** @var UriBuilder */
    private $uriBuilder;

    /** @var StorageProviderInterface */
    private $storageProvider;

    /** @var AppConfigProviderInterface */
    private $appConfigProvider;

    /** @var IconFactory */
    private $iconFactory;

    /** @var LanguageServiceProvider */
    private $languageServiceProvider;

    public function __construct(
        UriBuilder $uriBuilder,
        IconFactory $iconFactory,
        AppConfigProviderInterface $appConfigProvider,
        StorageProviderInterface $storageProvider,
        LanguageServiceProvider $languageServiceProvider
    ) {
        $this->uriBuilder = $uriBuilder;
        $this->iconFactory = $iconFactory;
        $this->appConfigProvider = $appConfigProvider;
        $this->storageProvider = $storageProvider;
        $this->languageServiceProvider = $languageServiceProvider;
    }

    public function render()
    {
        $bparams = GeneralUtility::_GP('bparams');

        // The key number 3 of the bparams contains the "allowed" string. Disallowed is not passed to
        // the element browser at all but only filtered out in DataHandler afterwards
        $allowedFileExtensions = GeneralUtility::trimExplode(',', \explode('|', $bparams)[3], true);

        // The key number 3 of the bparams contains the irre (Inline Relational Record Editing) object id
        $irreObjectId = \explode('|', $bparams)[4];

        $request = ServerRequestFactory::fromGlobals();
        $storageUid = $request->getQueryParams()['uid'] ?? \current($this->storageProvider->getStoragesForUser())->getUid();

        $storages = $this->getStoragesData();

        $backendUrls = [
            'fileActionUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_file_process'),
            'treeUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_tree_fetchData', ['uid' => $storageUid]),
            'flashMessagesUrl' =>  (string) $this->uriBuilder->buildUriFromRoute('ajax_flashmessages_render'),
            'clipboardUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_contextmenu_clipboard'),
            'downloadFilesUrl' => (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_download_files'),
            'editFileStorageUrl' => (string) $this->uriBuilder->buildUriFromRoute('record_edit'),
            'searchFilesUrl' => (string) $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_search_files', ['uid' => $storageUid]),
        ];

        $appConfig = $this->appConfigProvider->getConfig();
        $appConfig['backendUrls'] = $backendUrls;

        $jsFile = $this->getStreamlinedFileName('EXT:cms_filelist_ng/Resources/Public/JavaScript/es.js');
        $cssFile = $this->getStreamlinedFileName('EXT:cms_filelist_ng/Resources/Public/Css/filelist.css');

        $title = $this->languageServiceProvider->getLanguageService()->sL('LLL:EXT:cms_filelist_ng/Resources/Private/Language/locallang_mod_file_list_ng.xlf:file_browser.title');

        return "
            <html>
                <head>
                    <title>$title</title>
                    <link rel='stylesheet' href='$cssFile'>
                    <script type='text/javascript' src='$jsFile'></script>
                    <script type='text/javascript'>var app = " . \json_encode($appConfig) . ";</script>
                </head>
                <body>
                    <typo3-filebrowser
                        irreObjectId='" . $irreObjectId . "'
                        allowedFileExtensions='" . \json_encode($allowedFileExtensions) . "'
                        treeUrl='" . $backendUrls['treeUrl'] . "'
                        storages='" . \json_encode(\array_values($storages)) . "'
                        selectedStorageUid='" . $storageUid . "'
                    ></typo3-filebrowser>
                </body>
            </html>
        ";
    }

    public function processSessionData($data)
    {
        // TODO: Implement processSessionData() method.
    }

    public function getScriptUrl()
    {
        // TODO: Implement getScriptUrl() method.
    }

    public function getUrlParameters(array $values)
    {
        // TODO: Implement getUrlParameters() method.
    }

    public function isCurrentlySelectedItem(array $values)
    {
        // TODO: Implement isCurrentlySelectedItem() method.
    }

    /**
     * @todo simlify getSotragesData
     *
     * @return mixed[]
     */
    private function getStoragesData(): array
    {
        $serverRequest = ServerRequestFactory::fromGlobals();
        $uri = (string) $serverRequest->getUri();

        return \array_map(function ($storage) use ($uri) {
            $storageIcon =  $this->iconFactory->getIconForResource(
                $storage->getRootLevelFolder(),
                Icon::SIZE_SMALL,
                null,
                ['mount-root' => true]
            );

            return [
                'uid' => $storage->getUid(),
                'name' => $storage->getName(),
                'storageUrl' => $uri . '&uid=' . $storage->getUid(),
                'icon' => $storageIcon->getMarkup(),
                'type' => $storage->getDriverType(),
            ];
        }, $this->storageProvider->getStoragesForUser());
    }

    protected function getStreamlinedFileName($file, $prepareForOutput = true)
    {
        if (0 === \strpos($file, 'EXT:')) {
            $file = GeneralUtility::getFileAbsFileName($file);
            // as the path is now absolute, make it "relative" to the current script to stay compatible
            $file = PathUtility::getRelativePathTo($file) ?? '';
            $file = \rtrim($file, '/');
        } else {
            $file = GeneralUtility::resolveBackPath($file);
        }
        if ($prepareForOutput) {
            $file = GeneralUtility::createVersionNumberedFilename($file);
            $file = $this->getAbsoluteWebPath($file);
        }
        return $file;
    }

    /**
     * Gets absolute web path of filename for backend disposal.
     * Resolving the absolute path in the frontend with conflict with
     * applying config.absRefPrefix in frontend rendering process.
     *
     * @param string $file
     *
     * @return string
     *
     * @see \TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController::setAbsRefPrefix()
     */
    protected function getAbsoluteWebPath(string $file): string
    {
        if (TYPO3_MODE === 'FE') {
            return $file;
        }
        return PathUtility::getAbsoluteWebPath($file);
    }
}
