export type TJwtUser = {
  userId: number;
};

export type TJwtManager = TJwtUser & {
  institutionId: number;
};

export type TJwtPayload = {
  subId: number;
};
