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
