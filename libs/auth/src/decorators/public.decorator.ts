import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_CHAT_ENDPOINT = 'IS_CHAT_ENDPOINT';
export const ChatEndpoint = () => SetMetadata(IS_CHAT_ENDPOINT, true);

