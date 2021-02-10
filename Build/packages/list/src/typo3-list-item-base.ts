/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import { html, property, query, TemplateResult } from 'lit-element';
import styles from './typo3-list-item.pcss';
import themeStyles from '../../../theme/index.pcss';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

export class Typo3ListItemBase extends ListItemBase {
  public static styles = [themeStyles, styles];

  @property({ type: String }) value = '';
  @property({ type: String, reflect: true }) group: string | null = null;
  @property({ type: Number, reflect: true }) tabindex = -1;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) activated = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  @query('slot') protected slotElement!: HTMLSlotElement | null;

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
