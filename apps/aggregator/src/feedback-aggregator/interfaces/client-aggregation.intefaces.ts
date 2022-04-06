export interface IClientAggregations {
  aggregate(data: { institutionId: number; url: string; platformId: number }): Promise<void>;
}
