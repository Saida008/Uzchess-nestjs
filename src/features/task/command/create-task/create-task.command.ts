import { CreateTaskRequest } from "./create-task.request";

export class CreateTaskCommand {
  constructor(
    public readonly data: CreateTaskRequest,
  ) {}

  static fromRequest(data: CreateTaskRequest) {
    return new CreateTaskCommand(data);
  }
}