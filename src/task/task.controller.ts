
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.tasksService.findAll();
      this.loggerService.log('TasksController-Fetched all tasks successfully.');
      return tasks;
    } catch (error) {
      this.loggerService.error(
        'TasksController-Error while fetching all tasks: ' + error.message,
      );
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    try {
      const task = await this.tasksService.findOne(parseInt(id, 10));
      this.loggerService.log(`TasksController-Fetched task with ID ${id} successfully.`);
      return task;
    } catch (error) {
      this.loggerService.error(
        'TasksController-Error while fetching task by ID: ' + error.message,
      );
      throw error;
    }
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const createdTask = await this.tasksService.create(createTaskDto);
      this.loggerService.log(`TasksController-Created a new task with ID ${createdTask.id}.`);
      return createdTask;
    } catch (error) {
      this.loggerService.error('TasksController-Error while creating task: ' + error.message);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      const updatedTask = await this.tasksService.update(
        parseInt(id, 10),
        updateTaskDto,
      );
      this.loggerService.log(`TasksController-Updated task with ID ${id} successfully.`);
      return updatedTask;
    } catch (error) {
      this.loggerService.error('TasksController-Error while updating task: ' + error.message);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.tasksService.remove(parseInt(id, 10));
      this.loggerService.log(`TasksController-Deleted task with ID ${id} successfully.`);
    } catch (error) {
      this.loggerService.error('TasksController-Error while deleting task: ' + error.message);
      throw error;
    }
  }
}
