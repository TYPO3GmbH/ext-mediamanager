import '../src/typo3-dropzone.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { Typo3Dropzone } from '../src/typo3-dropzone';

describe('Typo3Dropzone', () => {
  let element: Typo3Dropzone;
  beforeEach(async () => {
    element = await fixture(
      html`
        <typo3-dropzone id="dropzone">
          <div>
            <h2>Drag and Drop Your File</h2>
          </div>
        </typo3-dropzone>
      `
    );
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Dropzone);
  });

  it('loads', async () => {
    expect(element).to.not.equal(undefined);
    if (!element.shadowRoot) throw new Error('No shadowRoot');
    const slot = element.shadowRoot.querySelector('slot') as HTMLSlotElement;
    expect(slot).to.not.equal(undefined);
    return true;
  });

  it('manages `dropEffects`', async () => {
    await elementUpdated(element);

    expect(element.dropEffect).to.equal('copy');

    element.dropEffect = 'move';

    await elementUpdated(element);

    expect(element.dropEffect).to.equal('move');
  });

  it('manages `dragover` event', async () => {
    await elementUpdated(element);

    expect(element.isDragged).to.be.false;

    element.dispatchEvent(new DragEvent('dragover'));

    expect(element.isDragged).to.be.false;

    const dataTransfer = new DataTransfer();

    const dragOverEvent = new DragEvent('dragover', {
      dataTransfer,
    });

    element.dispatchEvent(dragOverEvent);

    expect(element.isDragged).to.be.true;
  });

  it('allows `dragover` event to be canceled', async () => {
    const canceledDrag = (event: DragEvent): void => {
      event.preventDefault();
    };
    const el = await fixture<Typo3Dropzone>(
      html`
        <typo3-dropzone
          id="dropzone"
          @typo3-dropzone-should-accept=${canceledDrag}
        ></typo3-dropzone>
      `
    );

    await elementUpdated(el);

    expect(el.isDragged).to.be.false;

    const dataTransfer = new DataTransfer();

    const dragOverEvent = new DragEvent('dragover', {
      dataTransfer,
    });

    el.dispatchEvent(dragOverEvent);

    expect(el.dropAllowed).to.be.false;
    expect(dataTransfer.dropEffect).to.not.equal(el.dropEffect);
    expect(dataTransfer.dropEffect).to.equal('none');
  });

  it('manages `dragleave` event via debounce', async () => {
    let dragLeftCount = 0;
    const onDragLeave = (): void => {
      dragLeftCount += 1;
    };
    const el = await fixture<Typo3Dropzone>(
      html`
        <typo3-dropzone
          id="dropzone"
          @typo3-dropzone-dragleave=${onDragLeave}
        ></typo3-dropzone>
      `
    );

    await elementUpdated(el);

    expect(dragLeftCount).to.equal(0);

    el.dispatchEvent(new DragEvent('dragleave'));
    el.dispatchEvent(new DragEvent('dragleave'));

    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(dragLeftCount).to.equal(1);
  });

  it('manages `dragleave` event', async () => {
    let dropped = false;
    const onDrop = (): void => {
      dropped = true;
    };
    const el = await fixture<Typo3Dropzone>(
      html`
        <typo3-dropzone
          id="dropzone"
          @typo3-dropzone-drop=${onDrop}
        ></typo3-dropzone>
      `
    );

    await elementUpdated(el);

    expect(dropped).to.be.false;

    el.dispatchEvent(new DragEvent('drop'));

    expect(dropped).to.be.true;
  });
});
