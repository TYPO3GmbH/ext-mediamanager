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
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\FilelistNg\Backend\View\BackendTemplateView;

class FilelistController
{
    /** @var BackendTemplateView */
    private $view;

    /** @var UriBuilder */
    private $uriBuilder;

    public function __construct(
        BackendTemplateView $view,
        UriBuilder $uriBuilder
    ) {
        $this->view = $view;
        $this->uriBuilder = $uriBuilder;
        $this->view->initializeView();
    }

    public function indexAction(): ResponseInterface
    {
        return new HtmlResponse($this->view->render());
    }
}
