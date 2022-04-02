import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ConstructableDTO, LINK_CHANNEL } from '@libs/dtos';

export class GetConfigResponseDTO extends ConstructableDTO<GetConfigResponseDTO> {
  @ApiProperty()
  @Expose()
  CHAT_LINK_CHANNEL: LINK_CHANNEL;
}
