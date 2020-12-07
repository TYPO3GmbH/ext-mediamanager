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
