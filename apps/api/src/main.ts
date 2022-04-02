import CONFIG from 'config';
import { bootstrap } from '../../bootstrap';
import { ApiModule } from './api.module';

bootstrap('api.service', ApiModule, CONFIG.API_PORT);
