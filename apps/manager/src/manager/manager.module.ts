import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Manager, File } from '@libs/entities';

import { ManagerController } from './controllers/manager.controller';
import { ManagerService } from './services/manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Manager,
    File,
  ])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
