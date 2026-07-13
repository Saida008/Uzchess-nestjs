import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus,QueryBus } from '@nestjs/cqrs';

import { CreateCourseRequest } from '../commands/create-course/create-course.request';
import { CreateCourseCommand } from '../commands/create-course/create-course.command';
import { GetAllCoursesQuery } from '../queries/get-all-courses/get-all-courses.query';
import { GetCourseByIdQuery } from '../queries/get-course-by-id/get-course-by-id.query';
import { UpdateCourseRequest } from '../commands/update-course/update-course.request';
import { UpdateCourseCommand } from '../commands/update-course/update-course.command';
import { DeleteCourseCommand } from '../commands/delete-course/delete-course.command';

@Controller('courses')
export class CourseController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus : QueryBus
  ) {}

  @Post('create')
  async create(
    @Body() payload: CreateCourseRequest,
  ) {
    return await this.commandBus.execute(
      new CreateCourseCommand(payload),
    );
  }

   @Get()
  async getAll() {
  return await this.queryBus.execute(
    new GetAllCoursesQuery(),
  );
}
   @Get(':id')
  async getById(
  @Param('id') id: number,
) {
  return await this.queryBus.execute(
 new GetCourseByIdQuery(id),
  );
}

 @Put(':id')
 async update(
  @Param('id') id: number,
  @Body() payload: UpdateCourseRequest,
) {
  return await this.commandBus.execute(
    new UpdateCourseCommand(id, payload),
  );
}
  @Delete(':id')
  async delete(
  @Param('id') id: number,
) {
  return await this.commandBus.execute(
    new DeleteCourseCommand(id),
  );
}
 
  
}