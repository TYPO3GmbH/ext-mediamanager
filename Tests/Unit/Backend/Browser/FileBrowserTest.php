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

namespace TYPO3\CMS\FilelistNg\Tests\Unit\Backend\Browser;

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\FilelistNg\Backend\Browser\FileBrowser;
use TYPO3\CMS\FilelistNg\Backend\Service\AppConfigProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\Storage\StoragesProviderInterface;
use TYPO3\CMS\FilelistNg\Backend\View\BackendTemplateView;
use TYPO3\CMS\Recordlist\Browser\ElementBrowserInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;

class FileBrowserTest extends UnitTestCase
{
    /** @var FileBrowser */
    private $subject;

    /** @var \PHPUnit\Framework\MockObject\MockObject|BackendTemplateView */
    private $backendTemplateViewMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->backendTemplateViewMock = $this->createMock(BackendTemplateView::class);
        $this->backendTemplateViewMock->method('getRenderingContext')
            ->willReturn($this->createMock(RenderingContextInterface::class));

        $this->subject = new FileBrowser(
            $this->backendTemplateViewMock,
            $this->createMock(UriBuilder::class),
            $this->createMock(AppConfigProviderInterface::class),
            $this->createMock(StoragesProviderInterface::class)
        );
    }

    /**
     * @test
     */
    public function it_implements_correct_interfaces(): void
    {
        self::assertInstanceOf(ElementBrowserInterface::class, $this->subject);
    }
}
