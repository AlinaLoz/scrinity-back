import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ConfigService } from '../services/config.service';
import { GetConfigResponseDTO, GetCriterionsResponseDTO } from '../dtos/config.controller.dtos';

@Controller('config')
@ApiTags('config')
export class ConfigController {
  @Inject() private readonly configService: ConfigService;

  @Get('/')
  @ApiOkResponse({ type: GetConfigResponseDTO })
  getConfig(): GetConfigResponseDTO {
    return new GetConfigResponseDTO(this.configService.getConfig());
  }

  @Get('/criterions')
  getCriterions(): GetCriterionsResponseDTO {
    return this.configService.getCriterions();
  }
}
