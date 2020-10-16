import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-tooltip.js';
import { Typo3Tooltip } from '../src/typo3-tooltip';

describe('Typo3Tooltip', () => {
  let element: Typo3Tooltip;
  beforeEach(async () => {
    element = await fixture(html` <typo3-tooltip>Tooltip</typo3-tooltip> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Tooltip);
  });

  it('hides tooltip content by default', () => {
    const tooltip = element.shadowRoot!.querySelector('#tooltip')!;
    expect(tooltip.hasAttribute('hidden')).to.be.true;
  });

  it('can show tooltip', async () => {
    element.show();
    await elementUpdated(element);

    const tooltip = element.shadowRoot!.querySelector('#tooltip')!;
    expect(tooltip.hasAttribute('hidden')).not.to.be.true;
  });

  it('can hide tooltip', async () => {
    element.isHidden = false;
    element.hide();
    await elementUpdated(element);

    const tooltip = element.shadowRoot!.querySelector('#tooltip')!;
    expect(tooltip.hasAttribute('hidden')).to.be.true;
  });
});
