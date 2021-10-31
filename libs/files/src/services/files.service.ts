import { Inject, Injectable } from '@nestjs/common';

import { S3Service } from './s3.service';
import { TMulterFile } from '@libs/files/types/files.types';

@Injectable()
export class FilesService {
  @Inject() private readonly s3Service: S3Service;
  
  async uploadImages(files: TMulterFile[]): Promise<string[]> {
    return this.s3Service.uploadFiles(files);
  }
}
