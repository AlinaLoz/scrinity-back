import { Module } from '@nestjs/common';

import { FilesService } from './services/files.service';
import { S3Service } from './services/s3.service';

@Module({
  providers: [FilesService, S3Service],
  exports: [FilesService],
})
export class FilesModule {}
