import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-snackbar.js';
import { Typo3Snackbar } from '../src/typo3-snackbar';

describe('Typo3Snackbar', () => {
  let element: Typo3Snackbar;
  beforeEach(async () => {
    element = await fixture(html` <typo3-snackbar></typo3-snackbar> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Snackbar);
  });

  it('is not visible by default', () => {
    expect(element.visible).to.be.false;
  });

  it('will show snackbar on `visible: true`', async () => {
    Object.assign(element, { visible: true });
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    expect(element.visible).to.be.true;
  });

  it('will set snackbar message', async () => {
    Object.assign(element, { visible: true, message: 'Hello World' });

    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    const messageElement = element.shadowRoot!.querySelector(
      '.snackbar__message'
    ) as HTMLElement;
    expect(messageElement.textContent).to.be.eq('Hello World');
  });

  it('will render close button if dismissible', async () => {
    Object.assign(element, {
      visible: true,
      message: 'Hello World',
      dismissible: true,
    });

    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    const button = element.shadowRoot!.querySelector(
      '.snackbar__btn-close'
    ) as HTMLElement;
    expect(button).to.exist;
  });

  it('shows and hide snackbar after defined duration', async () => {
    Object.assign(element, { visible: true, message: 'Hello', duration: 15 });

    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    expect(element.visible).to.be.true;

    await new Promise(resolve => setTimeout(resolve, 50));

    await elementUpdated(element);

    expect(element.visible).to.be.false;
  });

  it('will set passed `variant`', async () => {
    Object.assign(element, {
      visible: true,
      message: 'Hello',
      variant: 'success',
      buttonText: 'Hello',
      dismissible: true,
    });

    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    expect(element.variant).to.be.eq('success');
  });
});
