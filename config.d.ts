declare module 'config' {
	export const API_PORT: number;
	export const POSTGRES: {
		readonly HOST: string;
		readonly USERNAME: string;
		readonly PASSWORD: string;
		readonly PORT: number;
		readonly DB: string;
		readonly RETRY_ATTEMPTS: number;
		readonly RETRY_DELAY: number;
	};
}
