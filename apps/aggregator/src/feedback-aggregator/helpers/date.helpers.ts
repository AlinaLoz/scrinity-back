import { subDays, subMonths, subYears } from 'date-fns';

export const fromRelativeTimeToTimestamp = (date: string): string => {
  const splitedDate = date.split(' ');

  const [count, unitRu] = splitedDate.length === 2 ? ['1', ...splitedDate] : splitedDate;
  const countNumber = +count.trim();

  if (unitRu.includes('день') || unitRu.includes('дня') || unitRu.includes('дней')) {
    return subDays(new Date(), countNumber).toISOString();
  }
  if (unitRu.includes('месяц')) {
    return subMonths(new Date(), countNumber).toISOString();
  }
  return subYears(new Date(), countNumber).toISOString();
};
