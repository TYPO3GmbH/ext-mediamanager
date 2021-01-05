import {
  customElement,
  html,
  property,
  PropertyValues,
  query,
  queryAll,
  TemplateResult,
} from 'lit-element';
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
import { orderBy } from 'lodash-es';
import * as fromView from './redux/ducks/view-mode';
import { Typo3Tooltip } from '../../../packages/tooltip/src/typo3-tooltip';
import { ShowSnackbarMessage } from '../../shared/src/types/show-snackbar-message';
import { SnackbarVariants } from '../../../packages/snackbar/src/lib/snackbar-variants';
import { Typo3ContextMenuOption } from '../../../packages/menu/src/lib/Typo3ContextMenuOption';

@customElement('typo3-filebrowser')
export class Typo3Filebrowser extends Typo3Filestorage {
  @property({ type: String }) irreObjectId = '';
  @property({ type: Array }) allowedFileExtensions: string[] = [];

  @query('typo3-tooltip') disabledFileTooltip!: Typo3Tooltip;

  @queryAll('typo3-card[disabled]') disabledCards!: Typo3Card[];

  public static styles = [themeStyles, fileStorageStyles, styles];

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.disabledCards.forEach(card =>
      card.addEventListener('mouseover', () => {
        this.disabledFileTooltip.anchor = card;
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    // trigger resize event (after modal is visible)
    setTimeout(() => dispatchEvent(new Event('resize')), 200);
  }

  protected render(): TemplateResult {
    return html`${super.render()} ${this.renderFooter}
    ${this.renderDisabledTooltip}`;
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

  protected get renderDisabledTooltip(): TemplateResult {
    return html` <typo3-tooltip
      >${translate('file_browser.fileNotAllowed')}</typo3-tooltip
    >`;
  }

  protected get listItems(): ListItem[] {
    const extendedListItems = super.listItems.map(listItem => {
      return {
        ...listItem,
        disabled: this._itemIsDisabled(listItem),
        notSelectable: !this._itemIsSelectable(listItem),
      };
    });

    return orderBy(extendedListItems, ['disabled'], ['asc']);
  }

  protected filterContextMenuOptions(
    options: Typo3ContextMenuOption[]
  ): Typo3ContextMenuOption[] {
    const allowedActions = ['addFolder'];

    return options.filter(option =>
      allowedActions.includes(option.callbackAction)
    );
  }

  _onItemDblClick(item: ListItem): void {
    if (item.sysType != '_FOLDER') {
      if (true === item.disabled) {
        return;
      }

      this._sendForeignInsertCommand([item.uid]);
      MessageHandler.sendPostMessage(
        [top],
        new ShowSnackbarMessage({
          duration: 2500,
          title: '',
          message: translate('file_browser.fileAdded'),
          variant: SnackbarVariants.success,
          dismissible: true,
        })
      );

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
      MessageHandler.sendPostMessage([IframeHelper.getContentIframe()], action);
    });
  }

  _itemIsSelectable(item: ListItem): boolean {
    return (
      item.sysType === '_FILE' &&
      (this.allowedFileExtensions.length == 0 ||
        this.allowedFileExtensions.includes(item.extension))
    );
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

  _orderItemsForCardgridView(listItems: ListItem[]): ListItem[] {
    return orderBy(
      listItems,
      [
        'disabled',
        item => item.sysType === '_FOLDER',
        fromView.getSortField(this.state),
      ],
      ['asc', 'desc', fromView.getSortDirection(this.state)]
    );
  }
}
