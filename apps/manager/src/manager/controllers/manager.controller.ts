import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtUser } from '@libs/auth';
import { GetMeResponseDTO } from '../dtos/manager.controller.dtos';
import { ManagerService } from '../services/manager.service';

@Controller('manager')
@ApiTags('manager')
export class ManagerController {
  @Inject() private readonly managerService: ManagerService;
  
  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Request() { user }: { user?: TJwtUser },
  ): Promise<GetMeResponseDTO> {
    return new GetMeResponseDTO({ user: await this.managerService.getUser(user?.userId) });
  }
}
