import { css } from 'lit-element';

export const splitButtonStyles = css`
  :host(:hover) .button:not([disabled]) {
    background-color: var(--typo3-split-button-background-color-hover, #666);
    color: var(--typo3-split-button-text-color-hover, #fdfdfd);
  }

  :host(:hover) .button:not([disabled]).trigger {
    background-color: var(
      --typo3-split-button-trigger-background-color,
      #333333
    );
    color: var(--typo3-split-button-trigger-text-color, #fdfdfd);
  }

  .button {
    align-items: center;
    justify-content: center;
    height: var(--typo3-split-button-height, 1.4rem);
    font-size: var(--typo3-split-button-font-size, 0.625rem);
    border-radius: 0;
  }

  .button.trigger {
    width: var(--typo3-split-button-height, 1.4rem);
  }

  .button:first-child {
    border-right: none;
  }

  .button.trigger * {
    fill: currentColor;
    stroke: currentColor;
    width: var(--typo3-split-button-trigger-icon-size, 0.4rem);
    height: var(--typo3-split-button-trigger-icon-size, 0.4rem);
  }
`;
