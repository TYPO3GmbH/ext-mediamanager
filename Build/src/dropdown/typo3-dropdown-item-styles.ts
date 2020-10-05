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
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: var(--mdc-list-side-padding, 1rem);
    padding-right: var(--mdc-list-side-padding, 1rem);
    outline: none;
    height: 3rem;
    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
  }
`;
