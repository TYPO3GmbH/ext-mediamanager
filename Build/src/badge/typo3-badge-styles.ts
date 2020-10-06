import { css } from 'lit-element';

export const badgeStyles = css`
  :host {
    padding: 0.25em 0.4em;
    font-weight: 700;
    vertical-align: baseline;
    text-align: center;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
    width: var(--typo3-badge-size, 1.375rem);
    height: var(--typo3-badge-size, 1.375rem);
    line-height: var(--typo3-badge-size, 1.375rem);
    color: var(--typo3-badge-text-color, #212529);
    background-color: var(--typo3-badge-background-color, #f8f9fa);
    font-size: var(--typo3-badge-font-size, 0.75rem);
  }
`;
