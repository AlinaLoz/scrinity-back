export type YandexFeedback = {
  icon: string;
  profession: string;
  author: string;
  text: string;
  date: string;
  rating: number;
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
