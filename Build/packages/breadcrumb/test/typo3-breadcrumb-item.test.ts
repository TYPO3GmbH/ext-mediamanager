import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-breadcrumb-item.js';
import { Typo3BreadcrumbItem } from '../src/typo3-breadcrumb-item';

describe('Typo3breadcrumbItem', () => {
  let element: Typo3BreadcrumbItem;
  beforeEach(async () => {
    element = await fixture(
      html`
        <typo3-breadcrumb-item
          link="http://www.example.test"
          title="Hello World"
        ></typo3-breadcrumb-item>
      `
    );
  });

  it('can create component', () => {
    expect(element).to.not.be.not.null;
  });

  it('renders an anchor element if link is given', () => {
    const root = element.shadowRoot ? element.shadowRoot : element;
    const link = root.querySelector('a') as HTMLElement;
    expect(link).to.exist;
    expect(link.tagName).to.be.equal('A');
    expect(link.textContent).to.be.eq('Hello World');
    expect(link.getAttribute('href')).to.be.eq('http://www.example.test');
  });

  it('renders a span element if no  link is given', async () => {
    const breadcrumbWithoutLink = await fixture(
      html`
        <typo3-breadcrumb-item title="Hello World"></typo3-breadcrumb-item>
      `
    );
    const root = breadcrumbWithoutLink.shadowRoot
      ? breadcrumbWithoutLink.shadowRoot
      : element;

    const link = root.querySelector('span') as HTMLElement;
    expect(link).to.exist;
    expect(link.tagName).to.be.eq('SPAN');
    expect(link.textContent).to.be.eq('Hello World');
  });
});
