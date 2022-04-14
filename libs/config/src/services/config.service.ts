import { Injectable } from '@nestjs/common';
import { CHAT_LINK_CHANNEL } from 'config';

import CRITERIONS from '../assets.json';
import { GetConfigResponseDTO, GetCriterionsResponseDTO } from '../dtos/config.controller.dtos';

@Injectable()
export class ConfigService {
  getConfig(): GetConfigResponseDTO {
    return {
      CHAT_LINK_CHANNEL,
    };
  }

  getCriterions(): GetCriterionsResponseDTO {
    return CRITERIONS;
  }
}
