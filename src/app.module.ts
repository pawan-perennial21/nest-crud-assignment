import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';
import { LoggerModule } from './logger/logger.module';
// import { ConfigModule } from './config/config.module';
// import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,LoggerModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: 'postgres',
        password: '123456',
        database: configService.get('DATABASE_NAME'),
        entities: [Task],
        synchronize: true,
      }),
    }),

    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
