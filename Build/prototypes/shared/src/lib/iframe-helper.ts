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

export class IframeHelper {
  static getContentIframe(): Window | null {
    const iframeElement = top.document.getElementById('typo3-contentIframe');

    return iframeElement
      ? (iframeElement as HTMLIFrameElement).contentWindow
      : null;
  }

  static getModalIframe(): Window | null {
    const iframeElements = top.document.getElementsByClassName('modal-iframe');

    return iframeElements.length > 0
      ? (iframeElements.item(0) as HTMLIFrameElement).contentWindow
      : null;
  }
}
