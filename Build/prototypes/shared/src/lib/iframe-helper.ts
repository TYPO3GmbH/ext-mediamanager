export class IframeHelper {
  static getContentIframe(): Window | null {
    const iframeElement = top.document.getElementById('typo3-contentIframe');

    return iframeElement
      ? (iframeElement as HTMLIFrameElement).contentWindow
      : null;
  }
}
