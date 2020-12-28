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
