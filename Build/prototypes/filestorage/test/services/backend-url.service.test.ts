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

import { expect } from '@open-wc/testing';
import { getUrl } from '../../src/services/backend-url.service';

describe('BackendUrlService', () => {
  beforeEach(async () => {
    // @ts-ignore
    window.app.backendUrls = {
      urlWithParam: '/typo3/ajax/context-menu/clipboard?token=123',
      urlWithoutParam: '/typo3/ajax/context-menu/clipboard',
    };
  });

  it('will return url without params', () => {
    expect(getUrl('urlWithParam')).to.be.eq(
      '/typo3/ajax/context-menu/clipboard?token=123'
    );
  });

  it('will return url with single param', () => {
    expect(getUrl('urlWithoutParam', { foo: 'bar' })).to.be.eq(
      '/typo3/ajax/context-menu/clipboard?foo=bar'
    );
  });

  it('will return url with multiple params', () => {
    expect(getUrl('urlWithParam', { foo: 'bar', foo2: 'bar2' })).to.be.eq(
      '/typo3/ajax/context-menu/clipboard?token=123&foo=bar&foo2=bar2'
    );
  });
});
