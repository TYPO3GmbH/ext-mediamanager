import { css } from 'lit-element';

export const dropzoneStyles = css`
  :host {
    display: block;
    text-align: center;
  }

  :host([dragged]) {
    background-color: var(
      --typo3-dropzone-background-color-selected-hover,
      rgba(0, 0, 0, 0.1)
    );
  }

  :host(:focus) {
    outline: 0;
  }
`;
