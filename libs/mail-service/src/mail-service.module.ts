import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { SMTP } from 'config';

import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: SMTP.HOST,
        port: SMTP.PORT,
        secure: false,
        auth: {
          user: SMTP.USERNAME,
          pass: SMTP.PASSWORD,
        },
      },
      defaults: {
        from: SMTP.SENDER,
      },
      template: {
        dir: join(__dirname, '../../..', 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailServiceModule {}
