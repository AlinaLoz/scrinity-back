import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import {
  File,
  Chat,
  Institution,
  Message,
  MessageFile,
  ChatCriterion,
} from '@libs/entities';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';
import { ERRORS } from '@libs/constants';

import { SendFeedbackBodyDTO } from '../dtos/feedback.controller.dtos';

@Injectable()
export class FeedbackService {
  @Inject() private connection: Connection;
  @InjectRepository(Institution) private readonly institutionRepository: Repository<Institution>;

  async sendFeedback(data: SendFeedbackBodyDTO & { userId?: number }): Promise<boolean> {
    const institution = await this.findInstitutionOrFail(data.institutionId);
    this.validateCriterions(data.criterions, institution);

    await this.connection.transaction(async (manager) => {
      const files = await manager.save(File, data.filesKeys.map((filename) => new File({
        filename,
      })));
      const chat = await manager.save(Chat, new Chat({
        institutionId: institution.id,
        userId: data.userId,
        isGood: data.isGood,
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
    return true;
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
