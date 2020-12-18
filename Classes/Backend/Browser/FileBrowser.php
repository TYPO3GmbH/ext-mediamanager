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

use TYPO3\CMS\Recordlist\Browser\AbstractElementBrowser;
use TYPO3\CMS\Recordlist\Browser\ElementBrowserInterface;
use TYPO3\CMS\Recordlist\Tree\View\LinkParameterProviderInterface;

class FileBrowser extends AbstractElementBrowser implements ElementBrowserInterface, LinkParameterProviderInterface
{
    protected function getBodyTagAttributes()
    {
        // TODO: Implement getBodyTagAttributes() method.
    }

    public function render()
    {
        return 'hello World';
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
}
