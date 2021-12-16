import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WebPushService } from './services/web-push.service';
import { PushSubscriptionRepository } from './reposotories/push-subscription.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PushSubscriptionRepository,
    ]),
  ],
  providers: [WebPushService],
  exports: [WebPushService],
})
export class LibWebPushModule {}
