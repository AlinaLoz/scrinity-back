import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company, Criterion, CriterionGroup, File, Institution, Manager } from '@libs/entities';
import { InstitutionController } from './controllers/institution.controller';
import { InstitutionService } from './services/institution.service';

@Module({
  imports: [TypeOrmModule.forFeature([File, Company, Manager, Institution, CriterionGroup, Criterion])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
