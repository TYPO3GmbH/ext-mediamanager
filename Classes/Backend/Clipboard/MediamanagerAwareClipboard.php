<?php
declare(strict_types=1);

namespace TYPO3\CMS\Mediamanager\Backend\Clipboard;

use TYPO3\CMS\Backend\Clipboard\Clipboard as BaseClipboard;
use TYPO3\CMS\Core\Utility\MathUtility;

class MediamanagerAwareClipboard extends BaseClipboard
{
    public const MEDIAMANAGER_CLIPBOARD_PAD = 'mediamanager';

    /**
     * {@inheritdoc}
     */
    public function setCmd($cmd)
    {
        if (self::MEDIAMANAGER_CLIPBOARD_PAD === $this->current && is_array($cmd['el'])) {
            $this->clipData[$this->current]['el'] = [];
        }
        parent::setCmd($cmd);
    }

    /**
     * {@inheritdoc}
     */
    public function initializeClipboard()
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
