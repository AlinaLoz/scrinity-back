import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { FEEDBACK_MESSAGE_MAX_LENGTH, FEEDBACK_MESSAGE_MIN_LENGTH, ERRORS } from '@libs/constants';
import { ResponsesDTO, ConstructableDTO } from '@libs/dtos';

export class SendFeedbackBodyDTO {
  @ApiProperty()
  @MinLength(FEEDBACK_MESSAGE_MIN_LENGTH, { message: ERRORS.STRING_IS_TOO_SHORT })
  @MaxLength(FEEDBACK_MESSAGE_MAX_LENGTH, { message: ERRORS.STRING_IS_TOO_LONG })
  @IsString({ message: ERRORS.INVALID_STRING })
  message: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray({ message: ERRORS.INVALID_ARRAY })
  @IsString({ message: ERRORS.INVALID_STRING, each: true })
  filesKeys: string[];

  @ApiProperty()
  @IsString({ message: ERRORS.INVALID_STRING })
  companyId: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray({ message: ERRORS.INVALID_ARRAY })
  @ArrayMinSize(1, { message: ERRORS.ARRAY_IS_TOO_SHORT })
  @IsString({ each: true, message: ERRORS.INVALID_STRING })
  criterions: string[];

  @ApiProperty({ type: Boolean })
  @IsBoolean({ message: ERRORS.INVALID_BOOLEAN })
  isGood: boolean;
}

export class SendFeedbackResponseDTO extends ResponsesDTO {}

export class UploadFeedbackImagesResponseDTO
  extends ConstructableDTO<UploadFeedbackImagesResponseDTO> {
  @ApiProperty()
  @Expose() imagesKeys: string[];
}
