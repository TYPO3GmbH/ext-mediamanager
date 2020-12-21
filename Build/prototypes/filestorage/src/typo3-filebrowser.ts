import { customElement, html, TemplateResult } from 'lit-element';
import { Typo3Filestorage } from './typo3-filestorage';
import themeStyles from '../../../theme/index.pcss';
import fileStorageStyles from './typo3-filestorage.pcss';
import styles from './typo3-filebrowser.pcss';
import * as fromList from './redux/ducks/list';

@customElement('typo3-filebrowser')
export class Typo3Filebrowser extends Typo3Filestorage {
  public static styles = [themeStyles, fileStorageStyles, styles];

  connectedCallback() {
    super.connectedCallback();

    // trigger resize event (after modal is visible)
    setTimeout(() => dispatchEvent(new Event('resize')), 200);
  }

  protected render(): TemplateResult {
    return html`${super.render()} ${this.footer}`;
  }

  protected get footer(): TemplateResult {
    return html`
      <div class="topbar-wrapper footer">
        <typo3-topbar>
          <div slot="right">
            <typo3-button
              color="primary"
              .disabled="${fromList.isEmptySelection(this.state)}"
              >Insert Items</typo3-button
            >
          </div>
        </typo3-topbar>
      </div>
    `;
  }

  _onItemDblClick(item: ListItem): void {
    if (item.sysType != '_FOLDER') {
      return;
    }

    super._onItemDblClick(item);
  }
}
