import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { CreateCourseReviewRequest } from "../commands/create-course/create-course-review/create-course-review.request";
import { CreateCourseReviewCommand } from "../commands/create-course/create-course-review/create-course-review.command";

@Controller("course-review")
export class CourseReviewController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post("create")
  async create(
    @Body() payload: CreateCourseReviewRequest,
  ) {
    return await this.commandBus.execute(
      new CreateCourseReviewCommand(payload),
    );
  }
}