import { addHours } from 'date-fns';
import { COOKIE_EXPIRES_HOURS } from '@libs/constants';

export const prepareCookiesOptions = (): Record<string, string | number | Date | boolean> => {
  return ({
    expires: addHours(Date.now(), COOKIE_EXPIRES_HOURS),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
};
