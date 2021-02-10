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

import { AppConfigService } from './app-config.service';

class TranslationService {
  public constructor(public appService: AppConfigService) {}

  get(translationKey: string): string {
    const app = this.appService.getAppConfig();
    const translations: { [key: string]: string } = app.translations;

    return Object.prototype.hasOwnProperty.call(translations, translationKey)
      ? translations[translationKey]
      : '';
  }
}
const service = new TranslationService(new AppConfigService());

export const translate = (key: string): string => service.get(key);
