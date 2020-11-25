import { html, property, query, TemplateResult } from 'lit-element';
import styles from './typo3-list-item.pcss';
import themeStyles from '../../../theme/index.pcss';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

export class Typo3ListItemBase extends ListItemBase {
  @property({ type: String }) value = '';
  @property({ type: String, reflect: true }) group: string | null = null;
  @property({ type: Number, reflect: true }) tabindex = -1;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) activated = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  @query('slot') protected slotElement!: HTMLSlotElement | null;

  public static styles = [themeStyles, styles];

  protected listeners: {
    target: Element;
    eventNames: string[];
    cb: EventListenerOrEventListenerObject;
  }[] = [
    {
      target: this,
      eventNames: ['click'],
      cb: () => {
        this.onClick();
      },
    },
  ];

  render(): TemplateResult {
    return html`
      <slot name="icon"></slot>
      <div class="list-item__text">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    for (const listener of this.listeners) {
      for (const eventName of listener.eventNames) {
        listener.target.addEventListener(eventName, listener.cb, {
          passive: true,
        });
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    for (const listener of this.listeners) {
      for (const eventName of listener.eventNames) {
        listener.target.removeEventListener(eventName, listener.cb);
      }
    }
  }
}
