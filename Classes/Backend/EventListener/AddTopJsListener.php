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

namespace TYPO3\CMS\Mediamanager\Backend\EventListener;

use TYPO3\CMS\Backend\Controller\Event\AfterBackendPageRenderEvent;
use TYPO3\CMS\Core\Page\PageRenderer;

class AddTopJsListener
{

    public function __construct(private PageRenderer $pageRenderer)
    {
    }

    public function __invoke(AfterBackendPageRenderEvent $event): void
    {
        $this->pageRenderer->addJsFile('EXT:mediamanager/Resources/Public/JavaScript/top_es.js');
        $event->setContent('<typo3-top-container style="height:0"></typo3-top-container>' . "\n" . $event->getContent());
    }
}
