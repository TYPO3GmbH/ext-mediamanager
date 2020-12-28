import { expect } from '@open-wc/testing';
import { IframeHelper } from '../../src/lib/iframe-helper';

describe('IframeHelper', () => {
  it('will return null if content iframe is missing', () => {
    expect(IframeHelper.getContentIframe()).to.be.null;
  });

  it('can return content iframe', () => {
    const child = document.createElement('div');
    child.innerHTML = `<iframe id="typo3-contentIframe" src='about:blank'></iframe>`;
    top.document.body.appendChild(child);
    expect(IframeHelper.getContentIframe()).not.to.be.null;
  });
});
