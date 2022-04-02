import * as sentry from '@sentry/node';
import * as config from 'config';
import { ISentryService } from '../interfaces/sentry.service.interface';

export class SentryService implements ISentryService {
  private installed = false;
  private serverName = '';
  private process = '';

  init(serverName: string): void {
    this.serverName = serverName;
    this.process = serverName;

    if (config.SENTRY.ENABLED) {
      this.install();
    }
  }

  install(): void {
    sentry.init({
      dsn: config.SENTRY.DSN,
      serverName: this.serverName,
      environment: process.env.NODE_APP_INSTANCE || 'local',
    });

    sentry.setTag('PROCESS', this.process);
    sentry.configureScope((scope) => {
      scope.addEventProcessor((event) => {
        if (this.process) {
          event.exception?.values?.forEach((v) => {
            v.type = `[${this.process}] ${v.type}`;
          });
        }

        return event;
      });
    });

    this.installed = true;
  }

  warning(message: string): void {
    this.sendMessageToSentry(message, sentry.Severity.Warning);
  }

  message(message: string): void {
    this.sendMessageToSentry(message, sentry.Severity.Info);
  }

  error(error: Error | unknown): Error | unknown {
    if (this.installed) {
      sentry.captureException(error);
    } else if (process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return error;
  }

  private sendMessageToSentry(message: string, level: sentry.Severity): void {
    if (!this.installed) {
      return;
    }
    sentry.captureMessage(message, level);
  }
}

const sentryService = new SentryService();
export { sentryService };
