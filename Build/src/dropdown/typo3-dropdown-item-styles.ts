import { css } from 'lit-element';

export const dropDownItemStyles = css`
  :host {
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding-left: var(--typo3-dropdown-list-item-side-padding, 0.5rem);
    padding-right: var(--typo3-dropdown-list-item-side-padding, 0.5rem);
    outline: none;
    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
    font-size: var(--typo3-button-font-size, 0.75rem);
    line-height: 2.5;
  }

  .checkmark {
    color: var(--typo3-dropdown-list-item-checkmark-color, #287fde);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    fill: currentcolor;
    display: inline-flex;
    width: var(--typo3-dropdown-list-item-checkmark-icon-size, 1rem);
    height: var(--typo3-dropdown-list-item-checkmark-icon-size, 1rem);
    margin-right: var(--typo3-dropdown-list-item-side-padding, 0.625rem);
  }
`;
