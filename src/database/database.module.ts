import { Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule again to make the ConfigService available inside the factory
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('databaseHost'),
        port: +configService.get('databasePort'),
        username: configService.get('databaseUsername'),
        password: configService.get('databasePassword'),
        database: configService.get('databaseName'),
        entities: [Task], // Add your entities here
        synchronize: true, // Set to true only in development mode
      }),
      inject: [ConfigService], // Inject the ConfigService into the factory function
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [DatabaseService, ConfigService],
})
export class DatabaseModule {}
