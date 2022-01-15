import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ConfigService } from '../services/config.service';
import { GetConfigResponseDTO } from '../dtos/config.controller.dtos';

@Controller('config')
@ApiTags('config')
export class ConfigController {
  @Inject() private readonly configService: ConfigService;

  @Get('/')
  @ApiOkResponse({ type: GetConfigResponseDTO })
  async getConfig(): Promise<GetConfigResponseDTO> {
    return new GetConfigResponseDTO(this.configService.getConfig());
  }
}
