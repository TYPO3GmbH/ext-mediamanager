import { customElement, html, property, TemplateResult } from 'lit-element';
import { Typo3Filestorage } from './typo3-filestorage';
import themeStyles from '../../../theme/index.pcss';
import fileStorageStyles from './typo3-filestorage.pcss';
import styles from './typo3-filebrowser.pcss';
import * as fromList from './redux/ducks/list';
import { IframeHelper } from '../../shared/src/lib/iframe-helper';
import { MessageHandler } from '../../shared/src/lib/message-handler';
import { translate } from './services/translation.service';
import { store } from './redux/store';
import { Typo3Card } from '../../../packages/card/src/typo3-card';

@customElement('typo3-filebrowser')
export class Typo3Filebrowser extends Typo3Filestorage {
  @property({ type: String }) irreObjectId = '';
  @property({ type: Array }) allowedFileExtensions: string[] = [];

  public static styles = [themeStyles, fileStorageStyles, styles];

  connectedCallback() {
    super.connectedCallback();
    // trigger resize event (after modal is visible)
    setTimeout(() => dispatchEvent(new Event('resize')), 200);
  }

  protected render(): TemplateResult {
    return html`${super.render()} ${this.renderFooter}`;
  }

  protected get renderFooter(): TemplateResult {
    return html`
      <div class="topbar-wrapper footer">
        <typo3-topbar>
          <div slot="left" class="allowed-extensions">
            ${this.renderAllowedFileExtensions}
          </div>
          <div slot="right">
            <typo3-button @click="${this._closeModal}"
              >${translate('button.cancel')}
            </typo3-button>
            <typo3-button
              color="primary"
              .disabled="${fromList.isEmptySelection(this.state)}"
              @click="${this._onInsert}"
              >${translate('file_browser.button.insert')}
            </typo3-button>
          </div>
        </typo3-topbar>
      </div>
    `;
  }

  protected get renderAllowedFileExtensions(): TemplateResult {
    if (this.allowedFileExtensions.length === 0) {
      return html``;
    }

    const allowedFileExtensionsHtml = this.allowedFileExtensions.map(
      fileExtension =>
        html`<typo3-badge color="success" size="small"
          >${fileExtension}</typo3-badge
        >`
    );

    return html`<div>${translate('cm.allowedFileExtensions')}</div>
      ${allowedFileExtensionsHtml}`;
  }

  _onItemDblClick(item: ListItem): void {
    if (item.sysType != '_FOLDER') {
      this._sendForeignInsertCommand([item.uid]);
      // @ts-ignore
      top.TYPO3.Notification.success('Success', 'Element added');
      return;
    }

    super._onItemDblClick(item);
  }

  _onInsert(): void {
    const uids = fromList.getSelectedItems(this.state).map(item => item.uid);
    this._sendForeignInsertCommand(uids);
    this._closeModal();
  }

  _closeModal(): void {
    // @ts-ignore
    parent.TYPO3.Modal.currentModal.trigger('modal-dismiss');
  }

  _sendForeignInsertCommand(uids: string[]): void {
    uids.forEach(uid => {
      const action = {
        actionName: 'typo3:foreignRelation:insert',
        objectGroup: this.irreObjectId,
        table: 'sys_file',
        uid: uid,
      };
      MessageHandler.sendPostMessage(IframeHelper.getContentIframe(), action);
    });
  }

  _itemIsSelectable(item: ListItem): boolean {
    return this.allowedFileExtensions.includes(item.extension);
  }

  _itemIsDisabled(item: ListItem): boolean {
    return item.sysType === '_FILE' && false === this._itemIsSelectable(item);
  }

  _onDatagridSelectionChange(event: CustomEvent<ListItem[]>): void {
    const identifier = event.detail
      .filter(item => this._itemIsSelectable(item))
      .map(item => item.identifier);

    store.dispatch(new fromList.SetSelection(identifier));
  }

  _onCardgridSelectionChange(event: CustomEvent<Typo3Card[]>): void {
    const identifier = event.detail
      .map((element: Typo3Card) => '' + element.value)
      .map(identifer => fromList.getListItemByIdentifier(this.state)(identifer))
      .filter(item => item && this._itemIsSelectable(item))
      .map(item => (item as ListItem).identifier);

    store.dispatch(new fromList.SetSelection(identifier));
  }
}
