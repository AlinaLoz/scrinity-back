import { Module } from '@nestjs/common';
import { ConstantsService } from './constants.service';

@Module({
  providers: [ConstantsService],
  exports: [ConstantsService],
})
export class ConstantsModule {}
