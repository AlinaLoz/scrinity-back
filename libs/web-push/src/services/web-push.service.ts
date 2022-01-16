import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import webpush, { PushSubscription } from 'web-push';
import * as crypto from 'crypto';
import * as CONFIG from 'config';

import { PushSubscriptionRepository } from '../reposotories/push-subscription.repository';
import { AppLogger } from '@libs/logger';

@Injectable()
export class WebPushService implements OnModuleInit {
  private logger = new AppLogger('web-push.service');
  @Inject() private readonly pushSubscriptionRepository: PushSubscriptionRepository;

  onModuleInit(): any {
    webpush.setVapidDetails('https://cabinet.lozita.click/api', CONFIG.WEB_PUSH.PUBLIC, CONFIG.WEB_PUSH.PRIVATE);
  }

  async handleSubscription(institutionId: number, subscription: PushSubscription): Promise<string> {
    const subscriptionId = this.createHash(subscription);
    await this.pushSubscriptionRepository.save({
      id: subscriptionId,
      institutionId,
      subscription,
    });
    return subscriptionId;
  }

  async sendNotification(institutionId: number): Promise<void> {
    const subscriptions = await this.pushSubscriptionRepository.find({
      where: { institutionId },
    });
    await subscriptions.reduce(async (promise, item) => {
      try {
        await promise;
        await webpush.sendNotification(
          item.subscription,
          JSON.stringify({
            title: 'Scrinity',
            text: 'Пришел новый отзыв',
            'click_action': CONFIG.CABINET_URL,
          }),
        );
      } catch(err) {
        this.logger.error(`error send ${item.id}: ${err.message}`);
      }
    }, Promise.resolve());
  }

  private createHash(input: any): string {
    const md5sum = crypto.createHash('md5');
    md5sum.update(Buffer.from(JSON.stringify(input)));
    return md5sum.digest('hex');
  }

}

