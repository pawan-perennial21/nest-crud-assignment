// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Task } from './entities/task.entity';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
// import { LoggerService } from 'src/logger/logger.service';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task)
//     private tasksRepository: Repository<Task>,
//     private readonly loggerService:LoggerService
//   ) {}

//   async findAll(): Promise<Task[]> {
//     try {
//       return await this.tasksRepository.find();
//     } catch (error) {
//       // Handle the error here, you can log it or rethrow it as needed.
//       throw new Error('Error while fetching tasks: ' + error.message);
//     }
//   }

//   async findOne(id: number) {
//     try {
//       return await this.tasksRepository.findOne({ where: { id } });
//     } catch (error) {
//       // Handle the error here, you can log it or rethrow it as needed.
//       throw new Error('Error while fetching task by id: ' + error.message);
//     }
//   }

//   async create(createTaskDto: CreateTaskDto): Promise<Task> {
//     try {
//       // const task = this.tasksRepository.create(updateTaskDto);
//       return await this.tasksRepository.save(createTaskDto);
//     } catch (error) {
//       // Handle the error here, you can log it or rethrow it as needed.
//       throw new Error('Error while creating task: ' + error.message);
//     }
//   }

//   async update(id: number,updateTaskDto: UpdateTaskDto,): Promise<Task> {
//     try {
//       const task = await this.tasksRepository.findOne({ where: { id } });
//       if (!task) {
//         throw new Error('Task not found');
//       }
//       Object.assign(task, updateTaskDto);
//       return await this.tasksRepository.save(task);
//     } catch (error) {
//       // Handle the error here, you can log it or rethrow it as needed.
//       throw new Error('Error while updating task: ' + error.message);
//     }
//   }

//   async remove(id: number): Promise<void> {
//     try {
//       await this.tasksRepository.delete(id);
//     } catch (error) {
//       // Handle the error here, you can log it or rethrow it as needed.
//       throw new Error('Error while deleting task: ' + error.message);
//     }
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly loggerService: LoggerService
  ) {}

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.tasksRepository.find();
      this.loggerService.log(`TasksService-Fetched all tasks successfully.`);
      return tasks;
    } catch (error) {
      this.loggerService.error('TasksService-Error while fetching tasks: ' + error.message);
      throw new Error('Error while fetching tasks: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.tasksRepository.findOne({ where: { id } });
      this.loggerService.log(`TasksService-Fetched task with ID ${id} successfully.`);
      return task;
    } catch (error) {
      this.loggerService.error('TasksService-Error while fetching task by id: ' + error.message);
      throw new Error('Error while fetching task by id: ' + error.message);
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const createdTask = await this.tasksRepository.save(createTaskDto);
      this.loggerService.log(`TasksService-Created a new task with ID ${createdTask.id}.`);
      return createdTask;
    } catch (error) {
      this.loggerService.error('TasksService-Error while creating task: ' + error.message);
      throw new Error('Error while creating task: ' + error.message);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new Error('Task not found');
      }
      Object.assign(task, updateTaskDto);
      const updatedTask = await this.tasksRepository.save(task);
      this.loggerService.log(`TasksService-Updated task with ID ${id} successfully.`);
      return updatedTask;
    } catch (error) {
      this.loggerService.error('TasksService-Error while updating task: ' + error.message);
      throw new Error('Error while updating task: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.tasksRepository.delete(id);
      this.loggerService.log(`TasksService-Deleted task with ID ${id} successfully.`);
    } catch (error) {
      this.loggerService.error('TasksService-Error while deleting task: ' + error.message);
      throw new Error('Error while deleting task: ' + error.message);
    }
  }
}
