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

namespace TYPO3\CMS\Mediamanager\Tests\Unit\Backend\Service;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Mediamanager\Backend\Service\FileReferencesProvider;
use TYPO3\CMS\Mediamanager\Backend\Service\FileReferencesProviderInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class FileReferencesProviderTest extends UnitTestCase
{
    /** @var FileReferencesProvider */
    private $subject;

    protected function setUp(): void
    {
        parent::setUp();
        $this->subject = new FileReferencesProvider(
            $this->createMock(ConnectionPool::class)
        );
    }

    /**
     * @test
     */
    public function it_implements_FileReferencesProviderInterface(): void
    {
        self::assertInstanceOf(FileReferencesProviderInterface::class, $this->subject);
    }
}
