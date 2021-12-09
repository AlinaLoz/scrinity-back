import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { AppLogger } from '@libs/logger';
import { MAIL_TEMPLATE, MAIL_TEMPLATE_FILE, MAIL_TEMPLATE_PROPS } from '../types/mail.types';

@Injectable()
export class MailService {
  logger = new AppLogger('mail.service');

  constructor(private mailerService: MailerService) {}

  async sendMail<T extends MAIL_TEMPLATE>(type: T, context: MAIL_TEMPLATE_PROPS[T]): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: context.email,
        subject: MAIL_TEMPLATE_FILE[type].SUBJECT,
        template: `./${MAIL_TEMPLATE_FILE[type].FILE_NAME}`, // `.hbs` extension is appended automatically
        context,
      });
      await this.logger.log(`success send link to email ${context.email}`);
    } catch (err) {
      this.logger.error(`Error send chat link: ${context.link}. Error: ${err}`);
    }
    return Promise.resolve(true);
  }
}
