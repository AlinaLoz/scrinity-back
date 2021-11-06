import { UnprocessableEntityError } from '@libs/exceptions';
import { ERRORS } from '@libs/constants';

export const imageFileFilter = (req: Request, file: any, callback: (error: Error | null, acceptFile: boolean) => void) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new UnprocessableEntityError([{ field: '', message: ERRORS.INVALID_IMAGES_FORMAT }]),
      false);
  }
  callback(null, true);
};
