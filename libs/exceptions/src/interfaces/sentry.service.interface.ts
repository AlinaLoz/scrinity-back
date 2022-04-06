export interface ISentryService {
  init(serverName: string): void;
  install(): void;
  warning(message: string): void;
  message(message: string): void;

  error(error: Error, key: string): void;
}
