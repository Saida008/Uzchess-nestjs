import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "../../entities/task.entity";
import { CreateTaskCommand } from "./create-task.command";

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand>
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async execute(command: CreateTaskCommand) {
    const task = this.taskRepository.create({
      title: command.data.title,
      description: command.data.description,
    });

    return await this.taskRepository.save(task);
  }
}