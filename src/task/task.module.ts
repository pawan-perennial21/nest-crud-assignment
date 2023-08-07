import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),LoggerModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
