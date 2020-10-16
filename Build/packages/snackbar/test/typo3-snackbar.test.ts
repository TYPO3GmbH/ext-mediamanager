import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-snackbar.js';
import { Typo3Snackbar } from '../src/typo3-snackbar';
import { SnackbarValues } from '../src/lib/snackbar-values';

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

  it('will show snackbar on `typo3-add-snackbar`', async () => {
    dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: new SnackbarValues(),
      })
    );
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    expect(element.visible).to.be.true;
  });

  it('will set snackbar message', async () => {
    dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: Object.assign(new SnackbarValues(), {
          message: 'Hello World',
        }),
      })
    );
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    const messageElement = element.shadowRoot!.querySelector(
      '.snackbar__message'
    ) as HTMLElement;
    expect(messageElement.textContent).to.be.eq('Hello World');
  });

  it('will display snackbar button if dismissible', async () => {
    dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: Object.assign(new SnackbarValues(), {
          buttonText: 'Hello',
          dismissible: true,
        }),
      })
    );
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    const button = element.shadowRoot!.querySelector(
      'typo3-button'
    ) as HTMLElement;
    expect(button.textContent).to.be.eq('Hello');
  });

  it('wont render snackbar button if not dismissible', async () => {
    dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: Object.assign(new SnackbarValues(), {
          dismissible: false,
        }),
      })
    );
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    const button = element.shadowRoot!.querySelector(
      'typo3-button'
    ) as HTMLElement;
    expect(button).not.to.exist;
  });

  it('shows and hide snackbar after defined duration', async () => {
    dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: Object.assign(new SnackbarValues(), {
          duration: 15,
        }),
      })
    );
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    expect(element.visible).to.be.true;

    await new Promise(resolve => setTimeout(resolve, 50));

    await elementUpdated(element);

    expect(element.visible).to.be.false;
  });

  it('will set `variant` by event', async () => {
    dispatchEvent(
      new CustomEvent('typo3-add-snackbar', {
        detail: Object.assign(new SnackbarValues(), {
          variant: 'success',
          dismissible: true,
        }),
      })
    );
    await new Promise(resolve => setTimeout(resolve, 5));

    await elementUpdated(element);

    expect(element.variant).to.be.eq('success');
    const button = element.shadowRoot!.querySelector(
      'typo3-button'
    ) as HTMLElement;
    expect(button.getAttribute('color')).to.be.eq('success');
  });
});
