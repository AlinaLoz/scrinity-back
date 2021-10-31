import { OnModuleInit } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as CONFIG from 'config';
import Multer from 'multer';

export class S3Service implements OnModuleInit {
  private s3: S3;

  onModuleInit(): void {
    this.s3 = new S3({
      accessKeyId: CONFIG.AWS_S3.ACCESS_KEY_ID,
      secretAccessKey: CONFIG.AWS_S3.SECRET_ACCESS_KEY,
      region: CONFIG.AWS_S3.REGION,
      signatureVersion: 'v4',
    });
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const keys: string[] = [];
    await files.reduce(async (promise, item) => {
      await promise;
      console.log('item', item);
      const key = `${Date.now().toString()}-${item.originalname || ''}`;
      await this.s3.upload({
        Bucket: 'project-z-feedback',
        Body: item.buffer,
        Key: key,
        ContentType: item.mimetype,
        ACL: 'public-read',
        CacheControl: 'max-age=31536000,s-maxage=31536000',
      }).promise();
      keys.push(key);
    }, Promise.resolve());
    return keys;
  }
}
