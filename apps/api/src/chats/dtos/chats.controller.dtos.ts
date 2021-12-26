import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { FEEDBACK_MESSAGE_MAX_LENGTH, FEEDBACK_MESSAGE_MIN_LENGTH, ERRORS, LINK_HASH_LENGTH } from '@libs/constants';
import { ResponsesDTO, ConstructableDTO, PaginationDTO } from '@libs/dtos';
import { ApiPropertyArray, ApiPropertyBoolean, ApiPropertyNumber, ApiPropertyString } from '@libs/decorators';

export class SendFeedbackBodyDTO {
  @ApiPropertyString({ minLength: FEEDBACK_MESSAGE_MIN_LENGTH, maxLength: FEEDBACK_MESSAGE_MAX_LENGTH })
  message: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray({ message: ERRORS.INVALID_ARRAY })
  @IsString({ message: ERRORS.INVALID_STRING, each: true })
  filesKeys: string[];

  @ApiPropertyNumber()
  institutionId: number;

  @ApiPropertyArray({ type: String, isNotEmpty: true })
  @IsString({ each: true, message: ERRORS.INVALID_STRING })
  criterions: string[];

  @ApiPropertyBoolean()
  isGood: boolean;
}

export class SendFeedbackResponseDTO extends ResponsesDTO {}

export class GetInfoByLinkQueryDTO {
  @ApiPropertyString({ minLength: LINK_HASH_LENGTH, maxLength: LINK_HASH_LENGTH })
  link: string;
}

export class GetInfoByLinkResponseDTO extends ConstructableDTO<GetInfoByLinkResponseDTO> {
  @ApiProperty()
  @Expose() institutionId: number;

  @ApiProperty()
  @Expose() chatId: number;
}

export class GetChatsQueryDTO extends PaginationDTO {
  @ApiPropertyNumber()
  institutionId: number;
}
