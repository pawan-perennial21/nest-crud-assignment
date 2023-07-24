// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Task } from './entities/task.entity';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task)
//     private tasksRepository: Repository<Task>,
//   ) {}

//   async findAll(): Promise<Task[]> {
//     return this.tasksRepository.find();
//   }

//   async findOne(id: number) {
//     return this.tasksRepository.findOne({ where: { id } });
//   }

//   async create(taskData: Partial<Task>): Promise<Task> {
//     const task = this.tasksRepository.create(taskData);
//     return this.tasksRepository.save(task);
//   }

//   async update(id: number, taskData: Partial<Task>): Promise<Task> {
//     const task = await this.tasksRepository.findOne({ where: { id } });
//     if (!task) {
//       throw new Error('Task not found');
//     }
//     Object.assign(task, taskData);
//     return this.tasksRepository.save(task);
//   }

//   async remove(id: number): Promise<void> {
//     await this.tasksRepository.delete(id);
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    try {
      return await this.tasksRepository.find();
    } catch (error) {
      // Handle the error here, you can log it or rethrow it as needed.
      throw new Error('Error while fetching tasks: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.tasksRepository.findOne({ where: { id } });
    } catch (error) {
      // Handle the error here, you can log it or rethrow it as needed.
      throw new Error('Error while fetching task by id: ' + error.message);
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      // const task = this.tasksRepository.create(updateTaskDto);
      return await this.tasksRepository.save(createTaskDto);
    } catch (error) {
      // Handle the error here, you can log it or rethrow it as needed.
      throw new Error('Error while creating task: ' + error.message);
    }
  }

  async update(id: number,updateTaskDto: UpdateTaskDto,): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new Error('Task not found');
      }
      Object.assign(task, updateTaskDto);
      return await this.tasksRepository.save(task);
    } catch (error) {
      // Handle the error here, you can log it or rethrow it as needed.
      throw new Error('Error while updating task: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.tasksRepository.delete(id);
    } catch (error) {
      // Handle the error here, you can log it or rethrow it as needed.
      throw new Error('Error while deleting task: ' + error.message);
    }
  }
}
