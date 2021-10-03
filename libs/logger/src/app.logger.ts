import { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import type { Format } from 'logform';

type Loggable = string | number | Record<string, unknown>;
export class AppLogger implements LoggerService {
  private readonly logger: Logger;

  constructor(ctx: string) {
    this.logger = createLogger({
      format: format.json(),
      defaultMeta: {
        ctx,
        service: this.getServiceName(),
      },
      transports: [
        new transports.Console({
          level: 'debug',
          format: this.getConsoleLogFormat(),
        }),
      ],
    });
  }

  private getServiceName(): string | null {
    if (!process?.mainModule) {
      return null;
    }
    const result = process.mainModule.filename.match(/.*\/([a-z-]+)\/main\.js/);
    return result ? result[1] : null;
  }

  private getConsoleLogFormat(): Format {
    return format.combine(format.timestamp(), this.customFormat());
  }

  private customFormat(): Format {
    return format.printf(
      ({ level, message, timestamp, ctx, service, durationMs }) => {
        let log = `${timestamp} [${service}] ${this.getColourByLevel(
          level,
        )}${level}\x1b[0m [${ctx}]: ${this.getColourByLevel(level)}`;
        if ((message as any).msg) {
          const { msg, ...rest } = message as any;
          log += `${msg}\u001b[39m`;
          if (durationMs !== undefined) {
            log += ` +${(durationMs / 1000).toFixed(3)}s`;
          }
          if (Object.keys(rest).length) {
            log += `\n${Object.values(rest).join('\n')}`;
          }
        } else {
          log += `\u001b[39m\n${JSON.stringify(message, null, 2)}`;
        }
        return log;
      },
    );
  }

  private getColourByLevel(level: string): string {
    return (
      {
        verbose: '\x1b[35m',
        debug: '\x1b[34m',
        info: '\x1b[32m',
        warn: '\x1b[33m',
        error: '\x1b[31m',
      }[level] || '\x1b[34m'
    );
  }

  log(message: Loggable): void {
    this.logger.info(this.formatMessage(message));
  }

  error(message: Loggable, trace?: string): void {
    this.logger.error({
      ...this.formatMessage(message),
      trace,
    });
  }

  warn(message: Loggable): void {
    this.logger.warn(this.formatMessage(message));
  }

  debug(message: Loggable): void {
    this.logger.debug(this.formatMessage(message));
  }

  verbose(message: Loggable): void {
    this.logger.verbose(this.formatMessage(message));
  }

  private formatMessage(message: Loggable): Record<string, unknown> {
    return typeof message !== 'object' ? { msg: message } : message;
  }
}
