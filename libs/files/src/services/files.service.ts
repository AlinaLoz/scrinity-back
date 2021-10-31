import { Inject, Injectable } from '@nestjs/common';

import { S3Service } from './s3.service';

@Injectable()
export class FilesService {
  @Inject() private readonly s3Service: S3Service;

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    return this.s3Service.uploadFiles(files)
  }
}
