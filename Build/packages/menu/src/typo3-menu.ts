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

import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { customElement } from 'lit-element';

@customElement('typo3-menu')
export class Typo3Menu extends MenuBase {
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.onBodyClick);
  }

  onBodyClick = (event: MouseEvent): void => {
    const path = event.composedPath();
    if (path.indexOf(this) != -1) {
      return;
    }
    this.close();
  };

  protected onOpened() {
    super.onOpened();
    window.addEventListener('click', this.onBodyClick, { passive: true });
  }

  protected onClosed() {
    super.onClosed();
    window.removeEventListener('click', this.onBodyClick);
  }
}
