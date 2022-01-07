import { EntityRepository, Repository } from 'typeorm';

import { Message } from '@libs/entities/message.entity';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {}
