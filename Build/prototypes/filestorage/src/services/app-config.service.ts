interface AppConfig {
  translations: { [key: string]: string };
  iconUrls: { [key: string]: string };
}

export class AppConfigService {
  getAppConfig(): AppConfig {
    return Object.prototype.hasOwnProperty.call(window, 'app')
      ? window.app
      : {
          translations: {},
          iconUrls: {},
        };
  }
}
