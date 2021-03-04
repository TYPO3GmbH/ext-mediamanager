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

namespace TYPO3\CMS\Mediamanager\Backend\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Clipboard\Clipboard;
use TYPO3\CMS\Backend\Controller\ContextMenuController as BaseContextMenuController;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Mediamanager\Backend\Clipboard\MediamanagerAwareClipboard;

class ContextMenuController extends BaseContextMenuController
{
    public function clipboardAction(ServerRequestInterface $request): ResponseInterface
    {
        /** @var Clipboard $clipboard */
        $clipboard = GeneralUtility::makeInstance(Clipboard::class);
        $clipboard->initializeClipboard();
        $clipboard->current = MediamanagerAwareClipboard::MEDIAMANAGER_CLIPBOARD_PAD;

        $clipboard->setCmd($request->getQueryParams()['CB']);
        $clipboard->cleanCurrent();

        $clipboard->endClipboard();
        return (new JsonResponse())->setPayload([]);
    }
}
