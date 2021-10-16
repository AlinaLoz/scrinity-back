declare module 'config' {
  export const NODE_ENV: 'development' | 'production';
  export const NODE_CONFIG_ENV: 'develop' | 'master' | 'prod';
  export const API_PORT: number;
  export const IS_OPEN_SWAGGER: boolean;
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
  }
}
