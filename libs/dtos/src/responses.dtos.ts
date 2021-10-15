import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ConstructableDTO } from '@libs/dtos/constructable.dto';

export enum RESPONSE_STATUS {
  OK = 'OK',
  ERROR = 'ERROR',
}

export class ResponsesDTO extends ConstructableDTO<ResponsesDTO> {
  @ApiProperty({ enum: RESPONSE_STATUS })
  @Expose()
  status: RESPONSE_STATUS;
}
