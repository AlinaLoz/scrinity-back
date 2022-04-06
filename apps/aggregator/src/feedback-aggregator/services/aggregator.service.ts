import { Injectable } from '@nestjs/common';

import { AppLogger } from '@libs/logger';
import { Institution, InstitutionPublicPlatformEntity } from '@libs/entities';
import { processByChain } from '@libs/helpers';

import { InstitutionRepository } from '../repositories/institution.repository';
import { MediatorAggregatingClientsService } from './mediator-aggregating-clients.service';

@Injectable()
export class AggregatorService {
  private readonly logger = new AppLogger(AggregatorService.name);

  constructor(
    private readonly institutionRepository: InstitutionRepository,
    private readonly mediatorAggregatingClientsService: MediatorAggregatingClientsService,
  ) {}

  async aggregate(): Promise<void> {
    const institutionsForAggregate = await this.institutionRepository.getInstitutionForAggregation();

    this.logger.log(`found ${institutionsForAggregate.length} institutions for aggregate feedback`);
    await this.aggregateInstitutionByChain(institutionsForAggregate);
    this.logger.log('end aggregating feedbacks');
  }

  private async aggregateInstitutionByChain(institutions: Institution[]): Promise<void> {
    await processByChain(institutions, async (institution: Institution) => {
      await processByChain(institution.publicPlatforms, this.handleInsByPlatform.bind(this, institution));
    });
  }

  private async handleInsByPlatform(
    institution: Institution,
    { publicPlatform, url }: InstitutionPublicPlatformEntity,
  ): Promise<void> {
    this.logger.log(
      `start aggregating feedbacks for ${institution.name} on platform = ${publicPlatform.name}, aggregation type ${publicPlatform.aggregationType}`,
    );
    const aggregationClient = await this.mediatorAggregatingClientsService.getClient(
      publicPlatform.name,
      publicPlatform.aggregationType,
    );
    await aggregationClient.aggregate({ url, institutionId: institution.id, platformId: publicPlatform.id });
    this.logger.log(`end aggregating feedbacks for ${institution.name}`);
  }
}
