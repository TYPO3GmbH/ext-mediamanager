export class IframeHelper {
  static getContentIframe(): Window | null {
    return (document.getElementById('typo3-contentIframe') as HTMLIFrameElement)
      .contentWindow;
  }
}
