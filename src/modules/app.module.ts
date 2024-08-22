import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectionConfiguration } from '../common/db/data-source';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(ConnectionConfiguration),
    UsersModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
