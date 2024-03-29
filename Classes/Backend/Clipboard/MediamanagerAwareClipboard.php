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

namespace TYPO3\CMS\Mediamanager\Backend\Clipboard;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Clipboard\Clipboard as BaseClipboard;
use TYPO3\CMS\Core\Utility\MathUtility;

class MediamanagerAwareClipboard extends BaseClipboard
{
    public const MEDIAMANAGER_CLIPBOARD_PAD = 'mediamanager';

    /**
     * {@inheritdoc}
     */
    public function setCmd(array $cmd): void
    {
        if (self::MEDIAMANAGER_CLIPBOARD_PAD === $this->current && is_array($cmd['el'])) {
            $this->clipData[$this->current]['el'] = [];
        }
        parent::setCmd($cmd);
    }

    /**
     * {@inheritdoc}
     */
    public function initializeClipboard(?ServerRequestInterface $request = null): void
    {
        $userTsConfig = $this->getBackendUser()->getTSConfig();
        $clipData = $this->getBackendUser()->getModuleData('clipboard', $userTsConfig['options.']['saveClipboard'] ? '' : 'ses');
        foreach ($this->getDefinedClipboardPadNames() as $padName) {
            $this->clipData[$padName] = is_array($clipData[$padName]) ? $clipData[$padName] : [];
        }

        $this->clipData['current'] = ($this->current = isset($this->clipData[$clipData['current']]) ? $clipData['current'] : 'normal');
    }

    /**
     * @return string[]
     */
    protected function getDefinedClipboardPadNames(): array
    {
        $this->numberTabs = MathUtility::forceIntegerInRange((int)($userTsConfig['options.']['clipboardNumberPads'] ?? 3), 0, 20);
        $clipboardNames = ['normal'];
        for ($tabIndex = 1; $tabIndex <= $this->numberTabs; $tabIndex++) {
            $clipboardNames[] = 'tab_' . $tabIndex;
        }
        $clipboardNames[] = self::MEDIAMANAGER_CLIPBOARD_PAD;

        return $clipboardNames;
    }
}
