<?php
declare(strict_types=1);

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