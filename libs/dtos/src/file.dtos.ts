import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileDTO {
  @ApiProperty()
  @Expose() filename: string;
}
