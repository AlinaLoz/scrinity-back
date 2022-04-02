import { UnprocessableEntityError } from '@libs/exceptions';
import { ERRORS } from '@libs/constants';

export const imageFileFilter = (
  req: Request,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  file: any,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (file.mimetype.toLowerCase().includes('image/image')) {
    file.originalname = Date.now() + '.' + file.originalname.toLowerCase();
    file.mimetype = file.mimetype.replace('image/image', 'image');
  } else if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new UnprocessableEntityError([{ field: '', message: ERRORS.INVALID_IMAGES_FORMAT }]), false);
  }
  callback(null, true);
};
