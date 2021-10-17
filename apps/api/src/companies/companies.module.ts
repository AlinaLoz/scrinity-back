import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from '@libs/entities';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
