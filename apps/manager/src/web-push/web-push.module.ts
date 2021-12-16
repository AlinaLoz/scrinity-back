import { Module } from '@nestjs/common';

import { LibWebPushModule } from '@libs/web-push';
import { WebPushController } from './controllers/web-push.controller';

@Module({
  imports: [LibWebPushModule],
  controllers: [WebPushController],
})
export class WebPushModule {}
