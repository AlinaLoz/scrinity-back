import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PhoneConfirmCodeRepository } from './repositories/phone-confirm-code.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneConfirmCodeRepository])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
