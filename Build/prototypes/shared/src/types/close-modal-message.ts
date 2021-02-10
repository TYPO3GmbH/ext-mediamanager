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

import { Message } from './message';

export const MODAL_CLOSED_MESSAGE_TYPE = 'typo3-modal-closed';

export class CloseModalMessage implements Message {
  readonly type = MODAL_CLOSED_MESSAGE_TYPE;

  constructor(
    public actionName: string,
    public actionData?: { [key: string]: string | Blob }
  ) {}
}
