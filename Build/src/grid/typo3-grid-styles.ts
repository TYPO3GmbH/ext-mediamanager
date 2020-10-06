import { css } from 'lit-element';

export const gridStyles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  slot {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--typo3-card-grid-colmin, 22ch), 1fr)
    );
    grid-gap: var(--typo3-card-grid-gap, 0.5rem);
    padding: var(--typo3-card-grid-gap, 0.5rem);
  }
`;
