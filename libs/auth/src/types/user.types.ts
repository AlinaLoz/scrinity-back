import { ROLE } from '@libs/constants';

export type TJwtUser = {
  userId: number;
  role: ROLE;
};

export type TJwtManager = TJwtUser & {
  institutionId: number;
};

export type TJwtPayload = {
  subId: number;
};
