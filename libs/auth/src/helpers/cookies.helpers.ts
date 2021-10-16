import { subHours } from 'date-fns';
import { COOKIE_EXPIRES_HOURS } from '@libs/constants/errors';

export const prepareCookiesOptions = (): Record<string, string | number | Date | boolean> => {
  return ({
    expires: subHours(Date.now(), COOKIE_EXPIRES_HOURS),
    httpOnly: true,
    sameSite: 'none',
  });
}
