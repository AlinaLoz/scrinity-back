export enum MAIL_TEMPLATE {
  CHAT_LINK = 'CHAT_LINK',
}

export type MAIL_TEMPLATE_PROPS = {
  [MAIL_TEMPLATE.CHAT_LINK]: {
    link: string,
    email: string,
  }
};

export const MAIL_TEMPLATE_FILE = {
  [MAIL_TEMPLATE.CHAT_LINK]: {
    FILE_NAME: 'chat-link',
    SUBJECT: 'Ссылка на чат для обратной связи',
  },
};
