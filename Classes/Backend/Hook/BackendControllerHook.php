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

namespace TYPO3\CMS\FilelistNg\Backend\Hook;

use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class BackendControllerHook
{
    public function addJavaScript(): void
    {
        $this->getPageRenderer()->addBodyContent('<typo3-top-container></typo3-top-container>');
        $this->getPageRenderer()->addJsFile('EXT:cms_filelist_ng/Resources/Public/JavaScript/top_es.js');
    }

    protected function getPageRenderer(): PageRenderer
    {
        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        \assert($pageRenderer instanceof PageRenderer);
        return $pageRenderer;
    }
}
