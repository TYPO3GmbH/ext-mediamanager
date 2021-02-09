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

namespace TYPO3\CMS\FilelistNg\Backend\Service;

use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconRegistry;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;

class SvgSpriteUrlProvider implements IconUrlProviderInterface
{
    /** @var IconRegistry */
    private $iconRegistry;

    public function __construct(IconRegistry $iconRegistry)
    {
        $this->iconRegistry = $iconRegistry;
    }

    public function getUrl(Icon $icon = null): ?string
    {
        if (null === $icon) {
            return null;
        }
        $iconConfiguration = $this->iconRegistry->getIconConfigurationByIdentifier($icon->getIdentifier());

        if (null === $iconConfiguration || !isset($iconConfiguration['options']['sprite'])) {
            throw new \RuntimeException('Missing sprite for icon ' . $icon->getIdentifier());
        }

        $iconSource = $iconConfiguration['options']['sprite'];
        if (0 === \strpos($iconSource, 'EXT:') || 0 !== \strpos($iconSource, '/')) {
            $iconSource = GeneralUtility::getFileAbsFileName($iconSource);
        }
        return PathUtility::getAbsoluteWebPath($iconSource);
    }
}
