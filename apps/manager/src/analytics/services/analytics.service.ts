import { Inject, Injectable } from '@nestjs/common';
import _merge from 'lodash.merge';
import _keyBy from 'lodash.keyby';
import _values from 'lodash.values';
import { addDays, addMonths, addWeeks, addYears, format, compareAsc } from 'date-fns';

import { ANALYTIC_STEP, FeedbackAnalyticsData, GetFeedbackAnalyticsQueryDTO, GetFeedbackAnalyticsResponseDTO } from '../dtos/analytics.dtos';
import { AnalyticsRepository } from '../repositories/analytics.repository';

@Injectable()
export class AnalyticsService {
  @Inject() private readonly analyticsRepository: AnalyticsRepository;

  async getFeedbackAnalytics(params: GetFeedbackAnalyticsQueryDTO & { institutionId: number }): Promise<GetFeedbackAnalyticsResponseDTO[]> {
    const dataFromDB = await this.analyticsRepository.getFeedbackAnalytics(params);
    const dates = AnalyticsService.getDates(params.step, params.fromDate, params.toDate);
    return dataFromDB.map((item) => {
      const nullifiedList: FeedbackAnalyticsData[] = dates.map((date) => ({ date, value: 0 }));
      item.data = _values( _merge(_keyBy(nullifiedList, 'date'), _keyBy(item.data, 'date')));
      return item;
    });
  }

  private static getDates(step: ANALYTIC_STEP, startDate: string, stopDate: string): string[] {
    const cbAdd = step === ANALYTIC_STEP.DAY ? addDays :
      step === ANALYTIC_STEP.MONTH ? addMonths :
        step === ANALYTIC_STEP.YEAR ? addYears :
          addWeeks;
    const dateArray = [];
    let currentDate = startDate;
    while (compareAsc(new Date(currentDate), new Date(stopDate)) < 1) {
      dateArray.push(format(new Date(currentDate),'yyyy-MM-dd') );
      currentDate = cbAdd(new Date(currentDate), 1).toDateString();
    }
    return dateArray;
  }
}
