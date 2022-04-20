import { PuppeterPageFetcherService } from './page-fetcher.services/puppeter-page-fetcher.service';
import { AxiosPageFetcherService } from './page-fetcher.services/axios-page-fetcher.service';

import { YandexParserService } from './yandex.services/parser.service';
import { YandexCheerioParser } from './yandex.services/cheerio.parser';
import { YandexPuppeteerParser } from './yandex.services/puppeteer.parser';
import { YandexApiService } from './yandex.services/api.service';

import { AggregatorService } from './aggregator.service';
import { MediatorAggregatingClientsService } from './mediator-aggregating-clients.service';

import { RelaxApiService } from './relax.services/api.service';

import { GoogleParserService } from './google/parser.service';
import { GooglePuppeteerParser } from './google/puppeteer.parser';

export const Services = [
  PuppeterPageFetcherService,
  AxiosPageFetcherService,
  YandexParserService,
  YandexCheerioParser,
  YandexPuppeteerParser,
  YandexApiService,
  AggregatorService,
  MediatorAggregatingClientsService,
  RelaxApiService,
  GoogleParserService,
  GooglePuppeteerParser,
];
