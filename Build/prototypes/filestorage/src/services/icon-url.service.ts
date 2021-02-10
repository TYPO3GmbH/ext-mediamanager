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

class IconUrlService {
  public constructor(public appService: AppConfigService) {}

  get(iconKey: string): string {
    const app = this.appService.getAppConfig();
    const iconUrls: { [key: string]: string } = app.iconUrls;

    return Object.prototype.hasOwnProperty.call(iconUrls, iconKey)
      ? iconUrls[iconKey]
      : '';
  }
}
const service = new IconUrlService(new AppConfigService());

export const getIconUrl = (key: string): string => service.get(key);
