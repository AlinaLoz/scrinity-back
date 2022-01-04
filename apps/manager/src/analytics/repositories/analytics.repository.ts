import { EntityRepository, Repository } from 'typeorm';

import { Chat } from '@libs/entities/chat.entity';
import { GetFeedbackAnalyticsQueryDTO, GetFeedbackAnalyticsResponseDTO } from '../dtos/analytics.dtos';

@EntityRepository(Chat)
export class AnalyticsRepository extends Repository<Chat> {

  getFeedbackAnalytics({
    institutionId, fromDate, toDate, step,
  }: GetFeedbackAnalyticsQueryDTO & { institutionId: number }): Promise<GetFeedbackAnalyticsResponseDTO[]> {
    return this.query(`
      WITH filtered AS (
        SELECT * FROM chat c2
        WHERE "institutionId" = $1 AND "createdAt" >= $2 AND "createdAt" <= $3
      ), grouped_by_date AS (
        SELECT date_trunc($4, "createdAt")::date AS "date", count(*) AS value, "isGood"
        FROM filtered
        GROUP BY "date", "isGood"
      ), mapped AS (
        SELECT *, to_jsonb(grouped_by_date.*) AS "data"
        FROM grouped_by_date
      )
      SELECT "isGood", array_agg(mapped.data) as "data"
      FROM mapped
      GROUP BY mapped."isGood";
    `, [institutionId, fromDate, toDate, step]);
  }

  getCretirionsAnalitics(): Promise<any> {
    return this.query(`
      WITH filtered AS (
        SELECT * FROM chat c2
        WHERE "institutionId" = $institutionId AND "createdAt" >= $from AND "createdAt" <= $to
      )
      SELECT date_trunc($step, "createdAt") AS "dateGroup", count(*), chat_criterion."criterionKey"
      FROM chat_criterion
      INNER JOIN filtered
      ON filtered.id = chat_criterion."chatId"
      GROUP BY "dateGroup", chat_criterion."criterionKey";
    `, []);
  }

}
