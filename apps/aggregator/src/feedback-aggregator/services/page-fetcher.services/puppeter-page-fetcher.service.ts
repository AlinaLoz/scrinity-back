import { Page, launch } from 'puppeteer';
import { Injectable } from '@nestjs/common';
import { PROXY } from 'config';

const VIEWPORT_WIDTH = 920;
const VIEWPORT_HEIGHT = 920;

@Injectable()
export class PuppeterPageFetcherService {
  async getPage(url: string): Promise<Page> {
    const browser = await launch({
      headless: true,
      args: [`--proxy-server=${PROXY.PROTOCOL}://${PROXY.HOST}:${PROXY.PORT}`],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
    });

    await page.authenticate({
      username: PROXY.USERNAME,
      password: PROXY.PASSWORD,
    });

    await page.goto(url);
    return page;
  }
}
