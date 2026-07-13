import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { PermissionDecorator } from "@/core/decorators/permission.decorator";
import { CreateTaskRequest } from "./requests/create-task.request";
import { CreateTaskCommand } from "./command/create-task/create-task.command";

@Controller("tasks")
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @PermissionDecorator("task:create")
  async createTask(@Body() data: CreateTaskRequest) {
    return await this.commandBus.execute(CreateTaskCommand.fromRequest(data));
  }
}