import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Controllers } from './controllers';
import { Services } from './services';
import { Repositories } from './respositories';

@Module({
  imports: [TypeOrmModule.forFeature(Repositories)],
  providers: Services,
  controllers: Controllers,
})
export class FeedbackModule {}
