import { addHours } from 'date-fns';
import { COOKIE_EXPIRES_HOURS } from '@libs/constants';

export const SAME_SITE_OPTIONS = {
  httpOnly: true,
  sameSite: 'NONE',
  secure: true,
};
export const prepareCookiesOptions = (): Record<string, string | number | Date | boolean> => {
  return {
    expires: addHours(Date.now(), COOKIE_EXPIRES_HOURS),
    ...SAME_SITE_OPTIONS,
  };
};
