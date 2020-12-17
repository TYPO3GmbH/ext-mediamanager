export interface ContextMenuItemOption {
  callbackAction: string;
  additionalAttributes?: {
    'data-url': string;
    'data-title': string;
    'data-message': string;
    'data-button-ok-text': string;
    'data-button-close-text': string;
  };
}
