import { css } from 'lit-element';

export const cardStyles = css`
  :host {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--typo3-card-width, 12rem);
    border: var(--typo3-card-border-size, 0.0625rem) solid transparent;
    border-radius: var(--typo3-card-border-radius, 0.25rem);
    text-decoration: none;
    border-color: var(--typo3-card-border-color, #eaeaea);
    background-color: var(--typo3-card-background-color, #fff);
  }

  :host(:hover) {
    border-color: var(--typo3-card-border-color-hover, #1ea7fd);
  }

  :host(:focus) {
    outline: none;
  }

  .body {
    padding-top: var(--typo3-card-body-padding-top, 1.25rem);
    padding-bottom: var(--typo3-card-body-padding-bottom, 1.25rem);
    padding-left: var(--typo3-card-body-padding-left, 1.875rem);
    padding-right: var(--typo3-card-body-padding-right, 1.875rem);
    text-align: center;
  }

  .title {
    font-size: var(--typo3-card-title-text-size, 0.875rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--typo3-card-title-text-color, #505050);
  }

  .subtitle {
    font-size: var(--typo3-card-subtitle-text-size, 0.625rem);
    color: var(--typo3-card-subtitle-color, #6e6e6e);
  }

  .image {
    height: var(--typo3-card-image-height, 8.5rem);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .image ::slotted(*) {
    height: 80%;
    object-fit: cover;
  }

  :host slot[name='badge'] {
    position: absolute;
    bottom: 0;
    right: 1.25rem;
    display: inline-block;
    margin-left: 0.625rem;
  }
`;
