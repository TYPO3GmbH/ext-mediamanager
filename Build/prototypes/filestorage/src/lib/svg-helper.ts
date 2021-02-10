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

import { html, TemplateResult } from 'lit-html';
import { getIconUrl } from '../services/icon-url.service';
import { ifDefined } from 'lit-html/directives/if-defined';

export function createSVGElement(
  iconKey: string,
  slot?: string
): TemplateResult {
  return html`
    <svg slot="${ifDefined(slot)}">
      <use xlink:href="" xlink:href="${getIconUrl(iconKey)}"></use>
    </svg>
  `;
}
