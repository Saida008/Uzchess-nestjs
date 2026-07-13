import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateCourseCategoryRequest } from '@/features/library/category/commands/create-category/create-course-category/create-course-category.request';
import { CreateCourseCategoryCommand } from '@/features/library/category/commands/create-category/create-course-category/create-course-category.command';

import { GetAllCourseCategoriesQuery } from '../queries/get-all-course-categories/get-all-course-categories.query';

import { UpdateCourseCategoryRequest } from '../commands/update-course-category/update-course-category.request';
import { UpdateCourseCategoryCommand } from '../commands/update-course-category/update-course-category.command';

import { DeleteCourseCategoryCommand } from '../commands/delete-course-category/delete-course-category.command';

@Controller('course-categories')
export class CourseCategoryController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @Post('create')
  async create(
    @Body() payload: CreateCourseCategoryRequest,
  ) {
    return await this.commandBus.execute(
      new CreateCourseCategoryCommand(payload),
    );
  }


  @Get()
  async getAll() {
    return await this.queryBus.execute(
      new GetAllCourseCategoriesQuery(),
    );
  }


  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateCourseCategoryRequest,
  ) {
    return await this.commandBus.execute(
      new UpdateCourseCategoryCommand(id, payload),
    );
  }


  @Delete(':id')
  async delete(
    @Param('id') id: number,
  ) {
    return await this.commandBus.execute(
      new DeleteCourseCategoryCommand(id),
    );
  }

}