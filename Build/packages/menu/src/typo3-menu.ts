import { MenuBase } from '@material/mwc-menu/mwc-menu-base';
import { customElement } from 'lit-element';

@customElement('typo3-menu')
export class Typo3Menu extends MenuBase {
  protected onOpened() {
    super.onOpened();
    window.addEventListener('click', this.onBodyClick, { passive: true });
  }

  protected onClosed() {
    super.onClosed();
    window.removeEventListener('click', this.onBodyClick);
  }

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
}
