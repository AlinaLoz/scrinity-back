export type YandexFeedback = {
  icon: string;
  name: string;
  profession: string;
  date: string;
  text: string;
  stars: number;
};

export interface IParser {
  getFeedbacks(
    url: string,
    props: {
      platformId: number;
      institutionId: number;
    },
  ): Promise<YandexFeedback[]>;
}
