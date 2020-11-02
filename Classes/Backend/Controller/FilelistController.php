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

namespace TYPO3\CMS\FilelistNg\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;
use TYPO3\CMS\FilelistNg\Backend\Service\BackendUserProvider;
use TYPO3\CMS\FilelistNg\Backend\View\BackendTemplateView;

class FilelistController
{
    /** @var BackendTemplateView */
    private $view;

    /** @var UriBuilder */
    private $uriBuilder;

    /** @var BackendUserProvider */
    private $backendUserProvider;

    /** @var IconFactory */
    private $iconFactory;

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder,
        BackendUserProvider $backendUserProvider,
        IconFactory $iconFactory
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->backendUserProvider = $backendUserProvider;
        $this->view->initializeView();
        $this->iconFactory = $iconFactory;
    }

    public function indexAction(): ResponseInterface
    {
        $storages = array_map(function($storage) {
            $data = $storage->getStorageRecord();
            $data['storageUrl'] = (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_storage', ['uid' => $storage->getUid()]);
            $data['icon'] = preg_replace('/(<img.*) (\/>)/', '$1 slot="image" />', $this->iconFactory->getIconForResource($storage->getRootLevelFolder())->getMarkup());
            return $data;
        }, $this->backendUserProvider->getBackendUser()->getFileStorages());

        $this->view->assign('storages', $storages);

        return new HtmlResponse($this->view->render());
    }

    public function storageAction(ServerRequestInterface $request): ResponseInterface
    {
        $this->view->getRenderingContext()->setControllerAction('storage');

        $storageUid = $request->getQueryParams()['uid'] ?? null;
        if (null === $storageUid) {
            return new HtmlResponse('Parameter "uid" is missing', 400);
        }

        $storages = array_map(function($storage) {
            $data = $storage->getStorageRecord();
            $data['storageUrl'] = (string) $this->uriBuilder->buildUriFromRoute('filelist_ng_storage', ['uid' => $storage->getUid()]);
            $data['icon'] = preg_replace('/(<img.*) (\/>)/', '$1 slot="image" />', $this->iconFactory->getIconForResource($storage->getRootLevelFolder())->getMarkup());
            return $data;
        }, $this->backendUserProvider->getBackendUser()->getFileStorages());


        $ajaxTreeUrl = $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_tree_fetchData', ['storageId' => $storageUid]);
        $ajaxFolderListUrl = $this->uriBuilder->buildUriFromRoute('ajax_filelist_ng_folder_fetchData');
        $this->view->assign('storagesJson', json_encode(array_values($storages)));
        $this->view->assign('selectedStorageUid', (int) $storageUid);

        $this->view->assign('treeUrl', (string) $ajaxTreeUrl);
        $this->view->assign('folderUrl', (string) $ajaxFolderListUrl);

        return new HtmlResponse($this->view->render());
    }
}
