/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

import { Color } from '../../../../packages/button/src/typo3-base-button';
import { ModalVariant } from '../../../../packages/modal/src/lib/modal-variant';

export interface ModalButton {
  label: string;
  color: Color;
  action: string;
}

export enum ModalType {
  CONFIRM = 'confirm',
  HTML = 'html',
}

export interface ModalData {
  variant?: ModalVariant;
  isForm?: boolean;
  type: ModalType;
  headline: string;
  content: string;
  modalButtons?: ModalButton[];
  dismissible?: boolean;
}
