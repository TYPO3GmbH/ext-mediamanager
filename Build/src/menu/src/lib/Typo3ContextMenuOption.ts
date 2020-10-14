export interface Typo3ContextMenuOption {
  additionalAttributes?: {
    'data-button-close-text': string;
    'data-button-ok-text': string;
    'data-message': string;
    'data-title': string;
  };
  callbackAction: string;
  icon: string;
  label: string;
  type: 'item' | 'divider';
}