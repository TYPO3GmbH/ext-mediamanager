import { css } from 'lit-element';

export const buttonStyles = css`
  :host {
    display: inline-flex;
    flex-direction: row;
    vertical-align: top;
  }

  .button {
    display: flex;
    flex: 1 1 auto;
    cursor: pointer;

    /*
      background-color: var(--typo3-button-background-color, #dedede);
      border-color: var(--typo3-border-color, #c4c4c4);
      color: var(--typo3-button-text-color, black);
      font-size: var(--typo3-button-font-size, 0.75rem);
      line-height: var(--typo3-button-line-height, 1.5);
      border-radius: var(--typo3-button-border-radius, 0.125rem);
      border-width: var(--typo3-button-border-width, 0.0625rem);

    */
  }
  .button:disabled {
    cursor: default;
  }

  slot[name='icon']::slotted(svg) {
    fill: currentColor;
    stroke: currentColor;
    width: var(--spectrum-alias-workflow-icon-size, 18px);
    height: var(--spectrum-alias-workflow-icon-size, 18px);
  }
`;
