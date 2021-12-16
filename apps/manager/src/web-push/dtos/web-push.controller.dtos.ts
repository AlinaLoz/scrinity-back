import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ConstructableDTO } from '@libs/dtos';
import { ApiPropertyString } from '@libs/decorators';

export class Keys {
  @ApiPropertyString()
  auth: string;

  @ApiPropertyString()
  p256dh: string;
}

export class HandleSubscriptionBodyDTO {
  @ApiPropertyString({ maxLength: 1000 })
  endpoint: string;

  @ApiProperty({ type: Keys })
  keys: Keys;
}

export class HandleSubscriptionResponseDTO
  extends ConstructableDTO<HandleSubscriptionResponseDTO> {
  @ApiProperty()
  @Expose() subscriptionId: string;
}
