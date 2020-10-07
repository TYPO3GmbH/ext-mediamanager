import { css } from 'lit-element';

export const topbarStyles = css`
  :host {
    display: flex;
    justify-content: center;
    z-index: 1;
    padding-top: var(--typo3-top-bar-bar-padding-top, 0.25rem);
    padding-bottom: var(--typo3-top-bar-bar-padding-bottom, 0.25rem);
    padding-left: var(--typo3-top-bar-bar-padding-left, 1.5rem);
    padding-right: var(--typo3-top-bar-bar-padding-right, 1.5rem);
    min-height: var(--typo3-top-bar-bar-min-height, 1.625rem);
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--typo3-top-bar-bar-background-color, #eee);
  }

  ::slotted(*) {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
    color: var(--typo3-top-bar-bar-text-color, #333);
    flex-grow: 1;
  }

  ::slotted([slot='right']) {
    justify-content: flex-end;
  }

  ::slotted([slot='center']) {
    justify-content: center;
  }
`;