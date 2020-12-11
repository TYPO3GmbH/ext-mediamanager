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

namespace TYPO3\CMS\FilelistNg\Backend\Validator;

use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Validation\Validator\AbstractValidator;

class DownloadSizeValidatorFactory implements DownloadSizeValidatorFactoryInterface
{
    /** @var ExtensionConfiguration */
    private $extensionConfiguration;

    public function __construct(ExtensionConfiguration $extensionConfiguration)
    {
        $this->extensionConfiguration = $extensionConfiguration;
    }

    public function createValidator(): AbstractValidator
    {
        /** @var AbstractValidator $resourceSizeValidator */
        $resourceSizeValidator = GeneralUtility::makeInstance(ResourcesSizeValidator::class, [
            'maximum' => (int) $this->extensionConfiguration->get('cms_filelist_ng', 'maxDownloadSizeMB'),
        ]);

        return $resourceSizeValidator;
    }
}
