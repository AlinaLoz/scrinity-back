import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CLIENT_URL } from 'config';

import { Chat, ChatCriterion, File, Institution, Message, MessageFile } from '@libs/entities';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';
import { ERRORS, LINK_HASH_LENGTH } from '@libs/constants';
import { MailService } from '@libs/mail-service';
import { MAIL_TEMPLATE } from '@libs/mail-service/types/mail.types';

import { SendFeedbackBodyDTO } from '../dtos/feedback.controller.dtos';

@Injectable()
export class FeedbackService {
  @Inject() private connection: Connection;

  @InjectRepository(Institution) private readonly institutionRepository: Repository<Institution>;
  @Inject() private readonly mailService: MailService;

  async sendFeedback(data: SendFeedbackBodyDTO & { userId?: number }): Promise<boolean> {
    const institution = await this.findInstitutionOrFail(data.institutionId);
    this.validateCriterions(data.criterions, institution);
    const { hash, link } = this.generateHashLink();
    await this.connection.transaction(async (manager) => {
      const files = await manager.save(File, data.filesKeys.map((filename) => new File({
        filename,
      })));
      const chat = await manager.save(Chat, new Chat({
        institutionId: institution.id,
        userId: data.userId,
        isGood: data.isGood,
        link: hash,
      }));
      const message = await manager.save(Message, new Message({
        chatId: chat.id,
        content: data.message,
        senderId: data.userId,
      }));
      await manager.save(MessageFile, files.map((file, index) => new MessageFile({
        fileId: file.id,
        messageId: message.id,
        index,
      })));
      await manager.save(ChatCriterion, data.criterions.map((criterionKey) => new ChatCriterion({
        chatId: chat.id,
        criterionKey,
      })));
    });
    // todo create notification service
    // todo сделать ввод почты
    await this.mailService.sendMail(MAIL_TEMPLATE.CHAT_LINK, { link, email: 'scrinity.by@gmail.com' });
    return true;
  }

  private generateHashLink(): {
    hash: string,
    link: string,
  } {
    const hash = crypto.randomBytes(LINK_HASH_LENGTH).toString('hex').slice(0, 7);
    const link = `${CLIENT_URL}${hash}`;

    return {
      hash,
      link,
    };
  }

  private async findInstitutionOrFail(id: number): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({
      where: { id },
      relations: ['criterionGroup', 'criterionGroup.criterions'],
    });
    if (!institution) {
      throw new NotFoundError([{
        field: 'institutionId',
        message: ERRORS.NOT_FOUND,
      }]);
    }
    return institution;
  }

  private validateCriterions(criterions: string[], institution: Institution): void {
    const companyCriterions = institution.criterionGroup.criterions.map(({ key }) => key);
    criterions.forEach((item) => {
      if (!companyCriterions.includes(item)) {
        throw new UnprocessableEntityError([{
          field: 'criterions',
          message: ERRORS.CRITERIONS_NOT_FOUND,
        }]);
      }
    });
  }
}
