import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ConstructableDTO, FileDTO, PaginationDTO } from '@libs/dtos';
import { ApiPropertyBoolean, ApiPropertyNumber } from '@libs/decorators';

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
  @Expose() createdAt: string;
}

export class GetChatsResponseDTO extends ConstructableDTO<GetChatsResponseDTO> {
  @ApiProperty()
  @Expose() total: number;

  @ApiProperty({ type: ChatDTO, isArray: true })
  @Type(() => ChatDTO)
  @Expose() items: ChatDTO[];
}

class SenderDTO {
  @ApiProperty()
  @Expose() id: number;
  
  @ApiProperty()
  @Expose() phoneNumber: string;
}

export class GetChatParamDTO {
  @ApiPropertyNumber()
  @Expose() id: number;
}

export class ChatMessageDTO {
  @ApiProperty()
  @Expose() id: number;
  
  @ApiProperty({ type: SenderDTO })
  @Type(() => SenderDTO)
  @Expose() sender: SenderDTO;
  
  @ApiProperty()
  @Expose() content: string;
  
  @ApiProperty({ type: FileDTO, isArray: true })
  @Type(() => FileDTO)
  @Expose() files: FileDTO[];
  
  @ApiProperty()
  @Expose() createdAt: string;
}

export class GetChatResponseDTO extends ConstructableDTO<GetChatResponseDTO> {
  @ApiProperty({ type: ChatMessageDTO, isArray: true })
  @Type(() => ChatMessageDTO)
  @Expose() items: ChatMessageDTO[];
}
