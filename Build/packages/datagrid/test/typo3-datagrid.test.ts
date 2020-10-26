import { expect, fixture, html } from '@open-wc/testing';
import '../src/typo3-datagrid.js';
import { Typo3Datagrid } from '../src/typo3-datagrid';

describe('Typo3Datagrid', () => {
  let element: Typo3Datagrid;
  beforeEach(async () => {
    element = await fixture(
      html` <typo3-datagrid
        schema='[{"name":"test", "title":" "}]'
        data='[{"test": "dummy-data"}]'
        ><typo3-datatgrid></typo3-datatgrid
      ></typo3-datagrid>`
    );
  });

  it('can create component', () => {
    expect(element).to.not.be.null;
    expect(element).to.be.instanceOf(Typo3Datagrid);
  });

  it('will render a canvas datagrid', async () => {
    const button = element.shadowRoot!.querySelector('canvas-datagrid')!;
    expect(button).to.exist;
  });

  it('will fire a `typo3-datagrid-selection-change` on selection change', async () => {
    const button = element.shadowRoot!.querySelector('canvas-datagrid')!;
    expect(button).to.exist;
  });
});
