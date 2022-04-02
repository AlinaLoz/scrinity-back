import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { IsArray, IsString, ValidateIf } from 'class-validator';
import { ConstructableDTO, FileDTO } from '@libs/dtos';
import { ApiPropertyNumber, ApiPropertyString } from '@libs/decorators';
import { ERRORS } from '@libs/constants';

export class SendMessageBodyDTO {
  @ApiPropertyNumber()
  chatId: number;

  @ApiPropertyString({ minLength: 1, maxLength: 1000 })
  @ValidateIf((data) => !data.filesKeys.length)
  message: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray({ message: ERRORS.INVALID_ARRAY })
  @IsString({ message: ERRORS.INVALID_STRING, each: true })
  filesKeys: string[] = [];
}

export class ChatDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty({ nullable: true })
  @Expose()
  sender: string | number;

  @ApiProperty()
  @Expose()
  isGood: boolean;

  @ApiProperty({ isArray: true })
  @Expose()
  criterion: string[];

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  numberOfUnread: number;

  @ApiProperty({ type: FileDTO, isArray: true })
  @Type(() => FileDTO)
  @Expose()
  files: FileDTO[];
}

class SenderDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @Expose()
  email: string;
}

export class ChatMessageDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ type: SenderDTO })
  @Type(() => SenderDTO)
  @Expose()
  sender: SenderDTO;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty({ type: FileDTO, isArray: true })
  @Type(() => FileDTO)
  @Expose()
  files: FileDTO[];

  @ApiProperty()
  @Expose()
  createdAt: string;
}

export class GetChatsResponseDTO extends ConstructableDTO<GetChatsResponseDTO> {
  @ApiProperty()
  @Expose()
  total: number;

  @ApiProperty({ type: ChatDTO, isArray: true })
  @Type(() => ChatDTO)
  @Expose()
  items: ChatDTO[];
}

export class GetChatParamDTO {
  @ApiPropertyNumber()
  @Expose()
  id: number;
}

export class GetChatResponseDTO extends ConstructableDTO<GetChatResponseDTO> {
  @ApiProperty({ type: ChatMessageDTO, isArray: true })
  @Type(() => ChatMessageDTO)
  @Expose()
  items: ChatMessageDTO[];
}

export class UploadFeedbackImagesResponseDTO extends ConstructableDTO<UploadFeedbackImagesResponseDTO> {
  @ApiProperty()
  @Expose()
  imagesKeys: string[];
}
