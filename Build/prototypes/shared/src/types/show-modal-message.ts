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

import { ModalData } from './modal-data';
import { Message } from './message';

export const SHOW_MODAL_MESSAGE_TYPE = 'typo3-show-modal';

export class ShowModalMessage implements Message {
  readonly type = SHOW_MODAL_MESSAGE_TYPE;
  constructor(public data: ModalData) {}
}
