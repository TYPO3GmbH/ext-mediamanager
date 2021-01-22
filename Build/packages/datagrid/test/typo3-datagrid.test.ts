import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import '../src/typo3-datagrid.js';
import { Typo3Datagrid } from '../src/typo3-datagrid';
import { EndEditEvent } from '../src/lib/event/EndEditEvent';
import { ContextMenuEvent } from '../src/lib/event/ContextMenuEvent';
import { CanvasDataGridEvent } from '../src/lib/event/CanvasDataGridEvent';

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

  it('will fire a `typo3-datagrid-value-change` on end edit', async () => {
    const event: EndEditEvent | {} = {
      aborted: false,
      value: 'New value',
      cell: {
        header: {
          name: 'fieldA',
        },
        value: 'OldValue',
        data: { identifier: 1 },
      },
    };

    const listener = oneEvent(element, 'typo3-datagrid-value-change');

    element._onEndEdit(event as EndEditEvent);

    const { detail } = await listener;
    expect(detail.value).to.be.eq('New value');
    expect(detail.data).to.be.eql({ identifier: 1 });
    expect(detail.field).to.be.eq('fieldA');
  });

  it('wont fire a `typo3-datagrid-value-change` on end edit if value have not changed', async () => {
    let valueChangedEvents = 0;

    element.addEventListener('typo3-datagrid-value-change', () => {
      valueChangedEvents += 1;
    });

    const event: EndEditEvent | {} = {
      aborted: false,
      value: 'Old value',
      cell: {
        header: {
          name: 'fieldA',
        },
        value: 'Old value',
        data: { identifier: 1 },
      },
    };

    element._onEndEdit(event as EndEditEvent);
    await elementUpdated(element);

    expect(valueChangedEvents).to.equal(0);
  });

  it('wont fire a `typo3-datagrid-value-change` on end edit if abort is true', async () => {
    let valueChangedEvents = 0;

    element.addEventListener('typo3-datagrid-value-change', () => {
      valueChangedEvents += 1;
    });

    const event: EndEditEvent | {} = {
      aborted: true,
      value: 'New value',
      cell: {
        header: {
          name: 'fieldA',
        },
        value: 'Old value',
        data: { identifier: 1 },
      },
    };

    element._onEndEdit(event as EndEditEvent);
    await elementUpdated(element);

    expect(valueChangedEvents).to.equal(0);
  });

  it('will fire a `typo3-datagrid-contextmenu` on contextMenu on content cell', async () => {
    const nativeEvent = new MouseEvent('contextmenu');

    const event: ContextMenuEvent | {} = {
      NativeEvent: nativeEvent,
      cell: {
        isHeader: false,
        data: { identifier: 1 },
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: () => {},
    };

    const listener = oneEvent(element, 'typo3-datagrid-contextmenu');

    element._onContextmenu(event as ContextMenuEvent);

    const { detail } = await listener;
    expect(detail.event).to.be.eq(nativeEvent);
    expect(detail.node).to.be.eql({ identifier: 1 });
  });

  it('wont fire a `typo3-datagrid-contextmenu` on contextMenu on header cell', async () => {
    let contextMenuEvents = 0;

    element.addEventListener('typo3-datagrid-contextmenu', () => {
      contextMenuEvents += 1;
    });

    const nativeEvent = new MouseEvent('contextmenu');

    const event: ContextMenuEvent | {} = {
      NativeEvent: nativeEvent,
      cell: {
        isHeader: true,
        data: { identifier: 1 },
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: () => {},
    };

    element._onContextmenu(event as ContextMenuEvent);
    await elementUpdated(element);

    expect(contextMenuEvents).to.equal(0);
  });

  it('will fire a `typo3-datagrid-dblclick` on two consecutive clicks', async () => {
    const event: CanvasDataGridEvent | {} = {
      NativeEvent: {
        button: 0,
      },
      cell: {
        header: {
          name: 'identifier',
        },
        isHeader: false,
        name: 'identifier',
        data: { identifier: 1 },
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      preventDefault: () => {},
    };

    const listener = oneEvent(element, 'typo3-datagrid-dblclick');

    element._onMouseup(event as CanvasDataGridEvent);
    element._onMouseup(event as CanvasDataGridEvent);

    const { detail } = await listener;
    expect(detail).to.be.eql({ identifier: 1 });
  });
});
