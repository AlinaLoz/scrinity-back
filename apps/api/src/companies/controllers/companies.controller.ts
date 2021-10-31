import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetCompanyParamDTO, GetCompanyResponseDTO } from '../dtos/companies.dtos';
import { CompaniesService } from '../services/companies.service';

@Controller('companies')
@ApiTags('companies')
export class CompaniesController {
  @Inject() private readonly companiesService: CompaniesService;

  @Get(':id')
  @ApiResponse({ type: GetCompanyResponseDTO })
  async getCompany(
    @Param() params: GetCompanyParamDTO,
  ): Promise<GetCompanyResponseDTO> {
    const company = await this.companiesService.getCompanyById(params.id);
    return new GetCompanyResponseDTO({
      ...company,
      criterias: company.criterionGroup.criterions,
    });
  }
}
