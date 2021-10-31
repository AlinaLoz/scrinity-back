import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import * as CONFIG from 'config';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PhoneConfirmCodeRepository } from './repositories/phone-confirm-code.repository';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: CONFIG.JWT.SECRET,
      signOptions: { expiresIn: CONFIG.JWT.EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      PhoneConfirmCodeRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    // PassportModule,
    // JwtModule,
  ],
})
export class AuthModule {}
