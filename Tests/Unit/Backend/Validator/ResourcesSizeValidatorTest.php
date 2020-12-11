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

namespace TYPO3\CMS\FilelistNg\Tests\Unit\Backend\Validator;

use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\FilelistNg\Backend\Validator\ResourcesSizeValidator;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

class ResourcesSizeValidatorTest extends UnitTestCase
{
    const DEFAULT_MAX_SIZE = 500;

    /** @var ResourcesSizeValidator */
    private $validator;

    protected function setUp(): void
    {
        parent::setUp();
        $this->validator = $this->getMockBuilder(ResourcesSizeValidator::class)
            ->onlyMethods(['translateErrorMessage'])
            ->setConstructorArgs([['maximum' => self::DEFAULT_MAX_SIZE]])
            ->getMock();
    }

    /**
     * @test
     */
    public function it_returns_error_if_resources_size_is_exceeded_for_simple_file(): void
    {
        $file = $this->createConfiguredMock(File::class, ['getSize' => self::DEFAULT_MAX_SIZE + 1]);
        self::assertTrue($this->validator->validate([$file])->hasErrors());
    }

    /**
     * @test
     */
    public function it_returns_error_if_resources_size_is_exceeded_for_nested_files(): void
    {
        $file = $this->createConfiguredMock(File::class, ['getSize' => 100]);
        $subFolderAFiles = [
            $this->createConfiguredMock(File::class, ['getSize' => 200]),
            $this->createConfiguredMock(File::class, ['getSize' => 100]),
            $this->createConfiguredMock(File::class, ['getSize' => 100]),
        ];

        $subFolderBFiles = [
            $this->createConfiguredMock(File::class, ['getSize' => 1]),
        ];

        $subFolderA = $this->createConfiguredMock(Folder::class, ['getFiles' => $subFolderAFiles, 'getSubfolders' => []]);
        $subFolderB = $this->createConfiguredMock(Folder::class, ['getFiles' => $subFolderBFiles, 'getSubfolders' => []]);

        $folderA = $this->createConfiguredMock(Folder::class, ['getFiles' => [], 'getSubfolders' => [$subFolderA, $subFolderB]]);

        self::assertTrue($this->validator->validate([$file, $folderA])->hasErrors());
    }

    /**
     * @test
     */
    public function it_returns_no_error_if_resources_size_is_in_range(): void
    {
        $file = $this->createConfiguredMock(File::class, ['getSize' => self::DEFAULT_MAX_SIZE -1]);

        self::assertFalse($this->validator->validate([$file])->hasErrors());
    }
}
