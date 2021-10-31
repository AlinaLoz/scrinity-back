import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { ERRORS } from '@libs/constants';
import { ConstructableDTO } from '@libs/dtos/constructable.dto';

export class GetCompanyParamDTO {
  @ApiProperty()
  @IsString({ message: ERRORS.INVALID_STRING })
  id: string;
}

export class CriterionDTO {
  @ApiProperty()
  @Expose() key: string;

  @ApiProperty()
  @Expose() isGood: boolean;
}

export class GetCompanyResponseDTO extends ConstructableDTO<GetCompanyResponseDTO> {
  @ApiProperty()
  @Expose() id: string;

  @ApiProperty()
  @Expose() name: string;

  @ApiProperty()
  @Expose() managerTitle: string;

  @ApiProperty()
  @Expose() isActive: boolean;

  @ApiProperty()
  @Expose() expiredTime: string;

  @ApiProperty({ type: CriterionDTO, isArray: true })
  @Type(() => CriterionDTO)
  @Expose() criterions: CriterionDTO[];
}
