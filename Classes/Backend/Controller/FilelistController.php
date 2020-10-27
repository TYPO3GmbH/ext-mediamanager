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
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Fluid\View\StandaloneView;

class FilelistController
{
    private const DEFAULT_TEMPLATE_ROOT_PATHS = ['EXT:cms_filelist_ng/Resources/Private/Templates'];

    /** @var StandaloneView */
    private $view;

    /** @var UriBuilder */
    private $uriBuilder;

    public function __construct(
        ModuleTemplate  $moduleTemplate,
        StandaloneView $view,
        UriBuilder $uriBuilder
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->view->setTemplateRootPaths(static::DEFAULT_TEMPLATE_ROOT_PATHS);
        $this->view->getRequest()->setControllerExtensionName('cms_filelist_ng');
    }

    public function indexAction(): ResponseInterface
    {
        return new HtmlResponse($this->view->render());
    }
}
