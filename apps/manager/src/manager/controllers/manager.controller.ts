import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtManager } from '@libs/auth';
import { GetMeResponseDTO } from '../dtos/manager.controller.dtos';
import { ManagerService } from '../services/manager.service';

@Controller('managers')
@ApiTags('managers')
@UseGuards(JwtAuthGuard)
export class ManagerController {
  @Inject() private readonly managerService: ManagerService;

  @Get('/me')
  @ApiResponse({ type: GetMeResponseDTO })
  async getMe(@Request() { user }: { user?: TJwtManager }): Promise<GetMeResponseDTO> {
    return new GetMeResponseDTO({ manager: await this.managerService.getUser(user?.managerId) });
  }
}
