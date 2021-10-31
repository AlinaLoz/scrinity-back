import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Company, Feedback, FeedbackCriterion, FeedbackFile } from '@libs/entities';
import { NotFoundError, UnprocessableEntityError } from '@libs/exceptions';
import { ERRORS } from '@libs/constants';

import { SendFeedbackBodyDTO } from '../dtos/feedback.controller.dtos';

@Injectable()
export class FeedbackService {
  @Inject() private connection: Connection;
  @InjectRepository(Company) private readonly companiesRepository: Repository<Company>;

  async sendFeedback(data: SendFeedbackBodyDTO & { userId?: number }): Promise<boolean> {
    const company = await this.findCompanyOrFail(data.companyId);
    this.validateCriterions(data.criterions, company);

    await this.connection.transaction(async (manager) => {
      const feedback = await manager.save(Feedback, new Feedback({
        isGood: data.isGood,
        companyId: data.companyId,
        userId: data.userId,
        message: data.message,
      }));
      await manager.save(FeedbackFile, data.filesKeys.map((fileId) => new FeedbackFile({
        feedbackId: feedback.id,
        fileId,
      })));
      await manager.save(FeedbackCriterion, data.criterions.map((criterionKey) => new FeedbackCriterion({
        feedbackId: feedback.id,
        criterionKey,
      })));
    });
    return true;
  }

  private async findCompanyOrFail(companyId: string): Promise<Company> {
    const company = await this.companiesRepository.findOne({
      where: {
        id: companyId,
      },
      relations: ['criterionGroup', 'criterionGroup.criterions'],
    });
    if (!company) {
      throw new NotFoundError([{
        field: 'companyId',
        message: ERRORS.NOT_FOUND,
      }]);
    }
    return company;
  }

  private validateCriterions(criterions: string[], company: Company): void {
    const companyCriterions = company.criterionGroup.criterions.map(({ key }) => key);
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
