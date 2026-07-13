import { CreateTaskRequest } from "../../requests/create-task.request";

export class CreateTaskCommand {
  static fromRequest(data: CreateTaskRequest) {
    return new CreateTaskCommand();
  }
}