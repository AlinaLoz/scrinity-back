import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company, Criterion, CriterionGroup } from '@libs/entities';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CriterionGroup,
      Criterion,
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
