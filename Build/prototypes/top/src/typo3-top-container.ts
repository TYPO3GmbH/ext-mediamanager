import { customElement, html, LitElement, TemplateResult } from 'lit-element';

@customElement('typo3-top-container')
export class Typo3TopContainer extends LitElement {
  private currentMessageTarget!: MessageEventSource | null;
  private currentMessageOrigin!: string;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('message', this._handlePostMessage);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this._handlePostMessage);
    super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    return html``;
  }

  _handlePostMessage = (event: MessageEvent) => {
    switch (event.data) {
      case 'typo3-enable-tree-toggle-button':
        this._enableTreeToggleButton(event);
        break;
    }
  };
  _enableTreeToggleButton(messageEvent: MessageEvent): void {
    const button = window.document.querySelector(
      '.topbar-button-navigationcomponent'
    ) as HTMLButtonElement;

    button.removeAttribute('disabled');
    this.currentMessageTarget = messageEvent.source;
    this.currentMessageOrigin = messageEvent.origin;

    button.addEventListener('click', this._handleTreeToggleButtonClick, true);
    button.querySelector('.icon-overlay-readonly')?.remove();
  }

  _handleTreeToggleButtonClick = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopImmediatePropagation();

    (this.currentMessageTarget as Window).postMessage(
      'typo3-tree-toggle',
      this.currentMessageOrigin
    );
  };
}
