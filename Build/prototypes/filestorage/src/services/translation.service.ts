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
