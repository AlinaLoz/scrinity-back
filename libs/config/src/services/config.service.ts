import { Injectable } from '@nestjs/common';
import { CHAT_LINK_CHANNEL } from 'config';

import { GetConfigResponseDTO } from '../dtos/config.controller.dtos';

@Injectable()
export class ConfigService {
  getConfig(): GetConfigResponseDTO {
    return {
      CHAT_LINK_CHANNEL,
    };
  }
}
