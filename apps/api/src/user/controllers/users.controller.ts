import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtUser } from '@libs/auth';
import { GetMeResponseDTO } from '../dtos/user.controler.dtos';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  @Inject() private readonly userService: UserService;

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() { user }: { user?: TJwtUser }): Promise<GetMeResponseDTO> {
    return new GetMeResponseDTO({ user: await this.userService.getUser(user?.userId) });
  }
}
