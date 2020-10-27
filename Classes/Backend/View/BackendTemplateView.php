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

namespace TYPO3\CMS\FilelistNg\Backend\View;

use TYPO3\CMS\Fluid\View\StandaloneView;

class BackendTemplateView extends StandaloneView
{
    private const DEFAULT_TEMPLATE_ROOT_PATHS = ['EXT:cms_filelist_ng/Resources/Private/Templates'];
    private const DEFAULT_EXTENSION_NAME = 'cms_filelist_ng';

    /**
     * {@inheritdoc}
     */
    public function initializeView()
    {
        parent::initializeView();
        $this->setTemplateRootPaths(static::DEFAULT_TEMPLATE_ROOT_PATHS);
        $this->getRequest()->setControllerExtensionName(self::DEFAULT_EXTENSION_NAME);
    }
}
