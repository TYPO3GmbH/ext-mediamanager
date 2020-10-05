import { css } from 'lit-element';

export const buttonStyles = css`
  :host {
    display: inline-flex;
    flex-direction: row;
    vertical-align: top;
  }

  :host .button slot[name='icon'] + #label {
    margin-left: 0.625rem;
  }

  :host .button #label + ::slotted([slot='icon']) {
    margin-left: 0.625rem;
  }

  :host .button:not([disabled]):hover {
    color: var(--typo3-button-text-color-hover, #333);
    background-color: var(--typo3-button-background-color-hover, #c4c4c4);
    border-color: var(--typo3-button-border-color-hover, #a6a6a6);
  }

  :host([disabled]) .button {
    cursor: not-allowed;
    opacity: 0.65;
  }

  .button {
    display: flex;
    flex: 1 1 auto;
    cursor: pointer;
    padding: 0.375rem;
    outline: none;

    color: var(--typo3-button-text-color, black);
    background-color: var(--typo3-button-background-color, #dedede);
    border-color: var(--typo3-button-border-color, #c4c4c4);
    font-size: var(--typo3-button-font-size, 0.75rem);
    line-height: var(--typo3-button-line-height, 1.4);
    border-radius: var(--typo3-button-border-radius, 0.125rem);
    border-width: var(--typo3-button-border-width, 0.0625rem);
  }

  slot[name='icon']::slotted(svg) {
    fill: currentColor;
    stroke: currentColor;
    width: var(--typo3-button-icon-size, 1rem);
    height: var(--typo3-button-icon-size, 1rem);
  }
`;
