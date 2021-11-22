import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { ERRORS } from '@libs/constants';
import { ConstructableDTO } from '@libs/dtos/constructable.dto';
import { FileDTO } from '@libs/dtos';

export class GetInstitutionParamDTO {
  @ApiProperty()
  @IsNumberString({}, { message: ERRORS.INVALID_NUMBER })
  id: number;
}

export class CriterionDTO {
  @ApiProperty()
  @Expose() key: string;

  @ApiProperty()
  @Expose() isGood: boolean;
}

export class ManagerDTO {
  @ApiProperty()
  @Expose() roleTitle: string;
}

export class CompanyDTO {
  @ApiProperty({ type: FileDTO })
  @Type(() => FileDTO)
  @Expose() image: FileDTO;
}

export class GetInstitutionResponseDTO extends ConstructableDTO<GetInstitutionResponseDTO> {
  @ApiProperty()
  @Expose() id: number;

  @ApiProperty()
  @Expose() name: string;

  @ApiProperty({ type: ManagerDTO })
  @Type(() => ManagerDTO)
  @Expose() manager: ManagerDTO;

  @ApiProperty({ type: CompanyDTO })
  @Type(() => CompanyDTO)
  @Expose() company: CompanyDTO;

  @ApiProperty()
  @Expose() isActive: boolean;

  @ApiProperty()
  @Expose() expiredTime: string;

  @ApiProperty({ type: CriterionDTO, isArray: true })
  @Type(() => CriterionDTO)
  @Expose() criterions: CriterionDTO[];
}
