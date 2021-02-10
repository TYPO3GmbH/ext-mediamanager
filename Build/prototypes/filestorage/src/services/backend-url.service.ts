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

class BackendUrlService {
  public constructor(public appService: AppConfigService) {}

  get(urlKey: string): string {
    const app = this.appService.getAppConfig();
    const urls: { [key: string]: string } = app.backendUrls;

    return Object.prototype.hasOwnProperty.call(urls, urlKey)
      ? urls[urlKey]
      : '';
  }
}

const service = new BackendUrlService(new AppConfigService());

export const getUrl = (key: string): string => service.get(key);
