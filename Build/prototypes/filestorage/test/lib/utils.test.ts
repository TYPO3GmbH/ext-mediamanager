import { expect } from '@open-wc/testing';
import {
  addSlotToRawHtml,
  extractStorageFromIdentifier,
  resolveNodePath,
} from '../../src/lib/utils';
import { Typo3Node } from '../../../../packages/filetree/src/lib/typo3-node';

describe('Utils', () => {
  it('can add slot to raw html', () => {
    const rawHtml = '<span>Hello World</span>';
    const htmlString = addSlotToRawHtml(rawHtml, 'text');

    const div = document.createElement('div');

    div.innerHTML = htmlString;

    const element = div.firstChild as HTMLElement;
    expect(element.slot).to.be.eq('text');
  });

  it('will return an empty array when trying to resolveNodePath with empty nodes', () => {
    const selectedNode = {
      identifier: 'NodeB',
      parentIdentifier: 'NodeA',
    } as Typo3Node;

    expect(resolveNodePath([], selectedNode)).to.be.eql([]);
  });

  it('will return an empty array when trying to resolveNodePath with empty nodes', () => {
    const nodes = [
      {
        identifier: 'NodeA',
        parentIdentifier: null,
      },
      {
        identifier: 'NodeB',
        parentIdentifier: 'NodeA',
      },
      {
        identifier: 'NodeC',
        parentIdentifier: 'NodeA',
      },
    ] as Typo3Node[];

    expect(resolveNodePath(nodes, null)).to.be.eql([]);
  });

  it('can resolve a node path', () => {
    const selectedNode = {
      identifier: 'NodeB',
      parentIdentifier: 'NodeA',
    } as Typo3Node;

    const nodes = [
      {
        identifier: 'NodeA',
        parentIdentifier: null,
      },
      {
        identifier: 'NodeB',
        parentIdentifier: 'NodeA',
      },
      {
        identifier: 'NodeC',
        parentIdentifier: 'NodeA',
      },
    ] as Typo3Node[];

    expect(
      resolveNodePath(nodes, selectedNode).map(node => node.identifier)
    ).to.be.eql(['NodeA', 'NodeB']);
  });

  it('can extract storage from identifier', () => {
    const identifier = '1:/_temp_/xoxo1_400/';
    expect(extractStorageFromIdentifier(identifier)).to.be.eq('1:');
  });
});
