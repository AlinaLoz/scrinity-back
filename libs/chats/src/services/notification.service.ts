import { Inject, Injectable } from '@nestjs/common';
import { LINK_CHANNEL } from '@libs/dtos';
import { MailService, MAIL_TEMPLATE } from '@libs/mail-service';

type NOTIFICATION_PROPS<T extends LINK_CHANNEL> = {
  [LINK_CHANNEL.SMS]: { phoneNumber: string };
  [LINK_CHANNEL.EMAIL]: { email: string; link: string; [field: string]: string };
}[T];

@Injectable()
export class NotificationService {
  @Inject() private readonly mailService: MailService;

  async sendEmail(data: NOTIFICATION_PROPS<LINK_CHANNEL.EMAIL>): Promise<boolean> {
    await this.mailService.sendMail(MAIL_TEMPLATE.CHAT_LINK, data);
    return true;
  }

  sendSms(): Promise<boolean> {
    return Promise.resolve(false);
  }

  sendNotification<T extends LINK_CHANNEL>(type: T, data: NOTIFICATION_PROPS<T>): Promise<boolean> {
    if (type === LINK_CHANNEL.SMS) {
      return this.sendSms();
    }
    return this.sendEmail(data as NOTIFICATION_PROPS<LINK_CHANNEL.EMAIL>);
  }
}
