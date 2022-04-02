import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (): CustomDecorator<string> => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_CHAT_ENDPOINT = 'IS_CHAT_ENDPOINT';
export const ChatEndpoint = (): CustomDecorator<string> => SetMetadata(IS_CHAT_ENDPOINT, true);
