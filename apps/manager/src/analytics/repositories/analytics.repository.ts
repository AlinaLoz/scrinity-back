import { EntityRepository, Repository } from 'typeorm';

import { Chat } from '@libs/entities/chat.entity';
import { GetCriterionsAnaliticsQueryDTO, GetFeedbackAnalyticsQueryDTO, GetFeedbackAnalyticsResponseDTO } from '../dtos/analytics.dtos';

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

  getCriterionsAnalitics({
    institutionId, fromDate, toDate,
  }: GetCriterionsAnaliticsQueryDTO & { institutionId: number }
  ): Promise<{ criterionKey: string, value: number, isGood: boolean }[]> {
    return this.query(`
      WITH filtered AS (
        SELECT * FROM chat c2
        WHERE "institutionId" = $1 AND "createdAt" >= $2 AND "createdAt" <= $3
      )
      SELECT count(*)::int as value, chat_criterion."criterionKey", criterion."isGood"
      FROM chat_criterion
      INNER JOIN filtered ON filtered.id = chat_criterion."chatId"
      INNER JOIN criterion ON criterion."key" = chat_criterion."criterionKey"
      GROUP BY chat_criterion."criterionKey", criterion."isGood"
      ORDER BY "value" DESC;
    `, [institutionId, fromDate, toDate]);
  }

}
