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

import { expect, fixture } from '@open-wc/testing';
import { createSVGElement } from '../../src/lib/svg-helper';
import { AppConfigService } from '../../src/services/app-config.service';

describe('SvgHelper', () => {
  beforeEach(async () => {
    const configService = new AppConfigService();
    const config = configService.getAppConfig();
    config.iconUrls['test.svg'] = 'xo.test';
    // @ts-ignore
    window.app = config;
  });

  it('can return svg html with use element', async () => {
    const element = await fixture(createSVGElement('test.svg'));
    expect(element).to.be.instanceOf(SVGElement);
    expect(element.hasAttribute('slot')).to.be.false;
    const useElement = element.querySelector('use') as SVGUseElement;
    expect(useElement).to.be.instanceOf(SVGUseElement);
    expect(useElement.getAttribute('xlink:href')).to.be.eq('xo.test');
  });

  it('can return svg html without slot', async () => {
    const element = await fixture(createSVGElement('test.svg'));
    expect(element).to.be.instanceOf(SVGElement);
    expect(element.hasAttribute('slot')).to.be.false;
  });

  it('can return svg html with slot', async () => {
    const element = await fixture(createSVGElement('test.svg', 'default'));
    expect(element).to.be.instanceOf(SVGElement);
    expect(element.getAttribute('slot')).to.be.eq('default');
  });
});
