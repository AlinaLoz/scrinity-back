import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetInstitutionParamDTO, GetInstitutionResponseDTO } from '../dtos/institution.dtos';
import { InstitutionService } from '../services/institution.service';

@Controller('institution')
@ApiTags('institution')
export class InstitutionController {
  @Inject() private readonly institutionService: InstitutionService;

  @Get(':id')
  @ApiResponse({ type: GetInstitutionResponseDTO })
  async getInstitution(@Param() params: GetInstitutionParamDTO): Promise<GetInstitutionResponseDTO> {
    const institution = await this.institutionService.getInstitutionById(+params.id);
    return new GetInstitutionResponseDTO({
      ...institution,
      criterions: institution.criterionGroup.criterions.sort(({ order: idA }, { order: idB }) => (idA < idB ? -1 : 1)),
    });
  }
}
