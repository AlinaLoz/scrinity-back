declare module 'config' {
  export const NODE_ENV: 'development' | 'production';
  export const NODE_CONFIG_ENV: 'develop' | 'master' | 'prod' | 'local';
  export const API_PORT: number;
  export const MANAGER_PORT: number;
  export const AGGREGATOR_PORT: number;
  export const IS_OPEN_SWAGGER: boolean;
  export const SENTRY: {
    ENABLED: boolean;
    DSN: string;
  };
  export const POSTGRES: {
    readonly HOST: string;
    readonly USERNAME: string;
    readonly PASSWORD: string;
    readonly PORT: number;
    readonly DB: string;
    readonly RETRY_ATTEMPTS: number;
    readonly RETRY_DELAY: number;
  };
  export const JWT: {
    readonly SECRET: string;
    readonly EXPIRES_IN: string;
    readonly SALT_ROUNDS: string;
  };
  export const AWS_S3: {
    readonly ACCESS_KEY_ID: string;
    readonly SECRET_ACCESS_KEY: string;
    readonly REGION: string;
  };
  export const SMTP: {
    HOST: string;
    PORT: number;
    SENDER: string;
    USERNAME: string;
    PASSWORD: string;
  };
  export const CABINET_URL: string;
  export const CLIENT_URL: string;

  export const WEB_PUSH: {
    PRIVATE: string;
    PUBLIC: string;
  };
  enum LINK_CHANNEL {
    SMS = 'sms',
    EMAIL = 'email',
  }

  export const CHAT_LINK_CHANNEL: LINK_CHANNEL;

  export const PROXY: {
    PROTOCOL: string;
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
  };
}
