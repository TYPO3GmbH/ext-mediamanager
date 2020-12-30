interface AppConfig {
  translations: { [key: string]: string };
  iconUrls: { [key: string]: string };
  backendUrls: { [key: string]: string };
}

export class AppConfigService {
  getAppConfig(): AppConfig {
    return Object.prototype.hasOwnProperty.call(window, 'app')
      ? ((window as unknown) as { app: AppConfig }).app
      : {
          translations: {},
          iconUrls: {},
          backendUrls: {},
        };
  }
}
