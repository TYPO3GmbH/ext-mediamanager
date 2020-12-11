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

use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\Resource\ResourceInterface;
use TYPO3\CMS\Extbase\Validation\Validator\AbstractValidator;

class ResourcesSizeValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $supportedOptions = [
        'maximum' => [PHP_INT_MAX, 'Maximum size of resources', 'integer'],
    ];

    /**
     * @param ResourceInterface[] $value
     */
    public function isValid($value)
    {
        $rawSize = \array_sum(\array_map([$this, 'getResourceSize'], $value));

        if ($rawSize > $this->options['maximum']) {
            $this->addError(
                $this->translateErrorMessage(
                    'validator.resourcessize.exceed',
                    'cms_filelist_ng',
                    [
                        $this->options['maximum'],
                    ]
                ),
                1607688433,
                [$this->options['maximum']]
            );
        }
    }

    protected function getResourceSize(ResourceInterface $resource): int
    {
        switch (true) {
            case $resource instanceof FileInterface:
                return $resource->getSize();
            case $resource instanceof Folder:
                $subResources = \array_merge($resource->getSubfolders(), $resource->getFiles());
                return \array_sum(\array_map([$this, 'getResourceSize'], $subResources));
        }
    }
}
