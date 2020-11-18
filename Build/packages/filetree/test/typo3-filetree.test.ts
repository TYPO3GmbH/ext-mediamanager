import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '../src/typo3-filetree.js';
import { Typo3Filetree } from '../src/typo3-filetree';
import { Typo3Node } from '../src/lib/typo3-node';

describe('Typo3Filetree', () => {
  let element: Typo3Filetree;
  beforeEach(async () => {
    element = await fixture(html` <typo3-filetree></typo3-filetree> `);
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Filetree);
  });

  it('it fires `typo3-node-expand` on showChildren', async () => {
    const node = { expanded: false, identifier: '1234' } as Typo3Node;

    const listener = oneEvent(element, 'typo3-node-expand');

    element._showChildren(node);
    const { detail } = await listener;
    expect(detail).to.be.eql(node);
  });

  it('it fires `typo3-node-collapse` on hideChildren', async () => {
    const node = { expanded: false, identifier: '1234' } as Typo3Node;

    const listener = oneEvent(element, 'typo3-node-collapse');

    element._hideChildren(node);

    const { detail } = await listener;
    expect(detail).to.be.eql(node);
  });

  it('it fires `typo3-node-select` on select', async () => {
    const node = { expanded: false, identifier: '1234' } as Typo3Node;
    const listener = oneEvent(element, 'typo3-node-select');

    element._selectNode(node);

    const { detail } = await listener;
    expect(detail).to.be.eql(node);
  });

  it('it fires `typo3-node-contextmenu` on contextmenu', async () => {
    const node = { expanded: false, identifier: '1234' } as Typo3Node;
    const listener = oneEvent(element, 'typo3-node-contextmenu');
    const mouseEvent = new MouseEvent('contextmenu');

    element._onContextmenu(mouseEvent, node);

    const { detail } = await listener;
    expect(detail['node']).to.be.eql(node);
    expect(detail['event']).to.be.eql(mouseEvent);
  });

  it('it fires `typo3-node-rename` on node rename', async () => {
    const node = { expanded: false, identifier: '1234' } as Typo3Node;
    const listener = oneEvent(element, 'typo3-node-rename');

    element._sendEditNodeLabelCommand(node, 'New Name');

    const { detail } = await listener;
    expect(detail['node']).to.be.eql(node);
    expect(detail['name']).to.be.eql('New Name');
  });
});
