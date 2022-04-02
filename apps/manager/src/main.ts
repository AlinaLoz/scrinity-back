import CONFIG from 'config';
import { bootstrap } from '../../bootstrap';
import { ManagerModule } from './manager.module';

bootstrap('manager.service', ManagerModule, CONFIG.MANAGER_PORT);
