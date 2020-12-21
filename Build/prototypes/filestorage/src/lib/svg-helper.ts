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
