interface AppConfig {
  translations: { [key: string]: string };
  iconUrls: { [key: string]: string };
  backendUrls: { [key: string]: string };
}

export class AppConfigService {
  getAppConfig(): AppConfig {
    return Object.prototype.hasOwnProperty.call(window, 'app')
      ? ((window.app as unknown) as AppConfig)
      : {
          translations: {},
          iconUrls: {},
          backendUrls: {},
        };
  }
}
