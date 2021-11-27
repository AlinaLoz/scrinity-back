import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ConstructableDTO, PaginationDTO } from '@libs/dtos';
import { ApiPropertyBoolean } from '@libs/decorators';

export class GetPaginationQueryDTO extends PaginationDTO {
  @ApiPropertyBoolean({ isOptional: true })
  isAnonymously: boolean;
}

export class ChatDTO {
  @ApiProperty()
  @Expose() id: number;

  @ApiProperty()
  @Expose() message: string;

  @ApiProperty({ nullable: true })
  @Expose() phoneNumber: string | number;

  @ApiProperty()
  @Expose() isGood: boolean;

  @ApiProperty({ isArray: true })
  @Expose() criterion: string[];

  @ApiProperty()
  @Expose() createAt: string;
}

export class GetChatsResponseDTO extends ConstructableDTO<GetChatsResponseDTO> {
  @ApiProperty()
  @Expose() total: number;

  @ApiProperty({ type: ChatDTO, isArray: true })
  @Type(() => ChatDTO)
  @Expose() items: ChatDTO[];
}
