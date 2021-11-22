import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import * as CONFIG from 'config';
import { Institution, File, Company, CriterionGroup, Criterion } from '@libs/entities';

import { AuthApiService } from './services/auth-api.service';
import { AuthApiController } from './controllers/auth-api.controller';
import { PhoneConfirmCodeRepository } from './repositories/phone-confirm-code.repository';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthManagerController } from './controllers/auth-manager.controller';
import { AuthManagerService } from './services/auth-manager.service';
import { ManagerRepository } from './repositories/manger.repository';

@Module({})
export class AuthModule {
  static register(type: 'api' | 'manager'): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule,
        JwtModule.register({
          secret: CONFIG.JWT.SECRET,
          signOptions: { expiresIn: CONFIG.JWT.EXPIRES_IN },
        }),
        TypeOrmModule.forFeature([
          Criterion,
          CriterionGroup,
          Company,
          File,
          Institution,
          UserRepository,
          PhoneConfirmCodeRepository,
          ManagerRepository,
        ]),
      ],
      ...(type === 'api' ? {
        controllers: [AuthApiController],
        providers: [
          JwtStrategy,
          AuthApiService,
        ],
      } : {}),
      ...(type === 'manager' ? {
        controllers: [AuthManagerController],
        providers: [
          JwtStrategy,
          AuthManagerService,
        ],
      } : {}),
    };
  }
}
