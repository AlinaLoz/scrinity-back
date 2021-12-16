import { EntityRepository, Repository } from 'typeorm';

import { PushSubscription } from '@libs/entities/push-subscription.entity';

@EntityRepository(PushSubscription)
export class PushSubscriptionRepository extends Repository<PushSubscription> {}
