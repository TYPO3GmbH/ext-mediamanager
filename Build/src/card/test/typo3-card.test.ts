import { expect, fixture, html } from '@open-wc/testing';
import { Typo3Card } from '../src/typo3-card';

describe('Typo3Card', () => {
  let element: Typo3Card;
  beforeEach(async () => {
    element = await fixture(html`
      <typo3-card title="Hello Title" subtitle="Hello Subtitle"></typo3-card>
    `);
  });

  it('displays the `title` attribute as `.title`', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;
    const titleEl = root.querySelector('.title');

    expect(titleEl).to.not.be.null;
    expect((titleEl as HTMLDivElement).textContent).to.contain('Hello Title');
  });

  it('displays the `subtitle` attribute as `.subtitle`', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;
    const subtitleEl = root.querySelector('.subtitle');

    expect(subtitleEl).to.not.be.null;
    expect((subtitleEl as HTMLDivElement).textContent).to.contain(
      'Hello Subtitle'
    );
  });
});
