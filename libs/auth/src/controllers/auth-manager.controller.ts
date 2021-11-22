import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
// import { Response } from 'express';
// import { AUTHORIZATION_COOKIE } from '@libs/constants';
//
// import { SAME_SITE_OPTIONS } from '../helpers/cookies.helpers';
// import { VerifyConfirmCodeResponseDTO } from '../dtos/auth.controller.dtos';
// import { RESPONSE_STATUS } from '@libs/dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthManagerController {

  // @Post('sign-in')
  // signIn(
  //   @Res() res: Response,
  // ): void {
  //   // res.clearCookie(AUTHORIZATION_COOKIE, SAME_SITE_OPTIONS);
  //   // res.send(new VerifyConfirmCodeResponseDTO({ status: RESPONSE_STATUS.OK }));
  // }
  //
  // @Post('sign-out')
  // signOut(
  //   @Res() res: Response,
  // ): void {
  //   // res.clearCookie(AUTHORIZATION_COOKIE, SAME_SITE_OPTIONS);
  //   // res.send(new VerifyConfirmCodeResponseDTO({ status: RESPONSE_STATUS.OK }));
  // }

}
