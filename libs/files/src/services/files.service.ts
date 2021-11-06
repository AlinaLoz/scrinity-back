import { Inject, Injectable } from '@nestjs/common';

import { TMulterFile } from '@libs/files/types/files.types';
import { DEFAULT_MULTER_FILE_SIZE_LIMIT_MB, ERRORS } from '@libs/constants';
import { UnprocessableEntityError } from '@libs/exceptions';

import { S3Service } from './s3.service';

@Injectable()
export class FilesService {
  @Inject() private readonly s3Service: S3Service;

  async uploadImages(files: TMulterFile[]): Promise<string[]> {
    files.forEach((file) => {
      if (file.size > DEFAULT_MULTER_FILE_SIZE_LIMIT_MB) {
        throw new UnprocessableEntityError([{
          field: 'images',
          message: ERRORS.IMAGE_TOO_LARGE,
        }]);
      }
    });
    return this.s3Service.uploadFiles(files);
  }
}
