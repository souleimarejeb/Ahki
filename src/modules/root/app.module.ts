import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionConfiguration } from '../../common/db/data-source';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(ConnectionConfiguration),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
