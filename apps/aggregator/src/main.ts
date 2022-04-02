import CONFIG from 'config';
import { bootstrap } from '../../bootstrap';
import { AggregatorModule } from './aggregator.module';

bootstrap('feedback-aggregator', AggregatorModule, CONFIG.AGGREGATOR_PORT);
