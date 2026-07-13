import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCourseLessonDto } from "../commands/create-course-lesson/create-course-lesson.dto";
import { CreateCourseLessonCommand } from "../commands/create-course-lesson/create-course-lesson.command";
import { UpdateCourseLessonRequest } from "../commands/update-course-lesson/update-course-lesson.request";
import { UpdateCourseLessonCommand } from "../commands/update-course-lesson/update-course-lesson.command";
import { DeleteCourseLessonCommand } from "../commands/delete-course-lesson/delete-course-lesson.command";
import { GetAllCourseLessonsQuery } from "../queries/get-all-course-lessons/get-all-course-lessons-query";
import { GetCourseLessonByIdQuery } from "../queries/get-course-lesson-by-id/get-course-lesson-by-id.query";

@Controller("course-lesson")
export class CourseLessonController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post("create")
    async create(
        @Body() payload: CreateCourseLessonDto,
    ) {
        return await this.commandBus.execute(
            new CreateCourseLessonCommand(payload),
        );
    }

      @Put(":id")
  async update(
  @Param("id") id: string,
  @Body() payload: UpdateCourseLessonRequest,
) {
  return await this.commandBus.execute(
    new UpdateCourseLessonCommand(id, payload),
  );
}

  @Get()
async getAll() {
  return await this.queryBus.execute(
    new GetAllCourseLessonsQuery(),
  );
}

  @Get(":id")
async getById(
  @Param("id") id: string,
) {
  return await this.queryBus.execute(
    new GetCourseLessonByIdQuery(id),
  );
}

   @Delete(":id")
  async delete(
  @Param("id") id: string,
) {
  return await this.commandBus.execute(
    new DeleteCourseLessonCommand(id),
  );
}
}