import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskController } from './task.controller';
import { CreateTaskHandler } from './command/create-task/create-task.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    CqrsModule,
  ],
  controllers: [
    TaskController,
  ],
  providers: [
    CreateTaskHandler,
  ],
})
export class TaskModule {}