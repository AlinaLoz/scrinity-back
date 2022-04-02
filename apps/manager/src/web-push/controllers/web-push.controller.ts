import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, TJwtManager } from '@libs/auth';
import { WebPushService } from '@libs/web-push';

import { HandleSubscriptionBodyDTO, HandleSubscriptionResponseDTO } from '../dtos/web-push.controller.dtos';

@Controller('subscriptions')
@ApiTags('subscriptions')
@UseGuards(JwtAuthGuard)
export class WebPushController {
  @Inject() private readonly webPushService: WebPushService;

  @Post('/')
  @ApiResponse({ type: HandleSubscriptionResponseDTO })
  async handleSubscription(
    @Request() req: { user?: TJwtManager },
    @Body() body: HandleSubscriptionBodyDTO,
  ): Promise<HandleSubscriptionResponseDTO> {
    return new HandleSubscriptionResponseDTO({
      subscriptionId: await this.webPushService.handleSubscription(req.user!.institutionId, body),
    });
  }
}
