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

abstract class AbstractAction {
  public abstract execute(el: HTMLElement): Promise<unknown>;
}

export class ImmediateAction extends AbstractAction {
  constructor(protected callback: () => void) {
    super();
    this.callback = callback;
  }
  public execute(): Promise<unknown> {
    return this.executeCallback();
  }

  private async executeCallback(): Promise<unknown> {
    return Promise.resolve(this.callback());
  }
}

export interface Typo3NotificationAction {
  label: string;
  action: AbstractAction;
}
