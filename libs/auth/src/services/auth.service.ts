import { Injectable } from '@nestjs/common';
import { RequestSmsCodeBodyDTO } from '../dtos/auth.controller.dtos';

@Injectable()
export class AuthService {
  requestSmsCode(body: RequestSmsCodeBodyDTO): any {
    return body;
  }
}
