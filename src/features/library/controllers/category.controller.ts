import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { DeleteCategoryRequest } from '../category/commands/delete-category/delete-category.request';
import { Category } from '../entities/category.entity';
import { CategoryUpdateDto } from '../dtos/category/category.update.dto';

import { CreateCategoryRequest } from '../category/commands/create-category/create-category.request';
import { GetAllCategoriesRequest } from '../category/queries/get-all-categories/get-all-categories.request';
import { GetAllCategoriesResponse } from '../category/queries/get-all-categories/get-all-categories.response';
import { PaginatedResult, PaginatedResultDTO } from './language/paginated-result.dto';
import { Role } from '@/features/auth/entities/role.entity';

@Controller('category')
@ApiBearerAuth()
// @UseGuards(AuthGuard)
export class CategoryController {
  constructor(
    private readonly cmdBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: PaginatedResultDTO(GetAllCategoriesResponse) })
  async getAll(@Query() filters: GetAllCategoriesRequest) {
    return await this.queryBus.execute(filters.toQuery());
  }

  @Post('create')
  async create(@Body() payload: CreateCategoryRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const category = await Category.findOneBy({ id });

    if (!category) {
      return {
        message: 'Category topilmadi',
      };
    }

    return category;
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CategoryUpdateDto,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id));
  }
  @Delete('delete/:id')
async delete(@Param('id', ParseIntPipe) id: number) {
  const payload = new DeleteCategoryRequest();
  payload.id = id;

  return await this.cmdBus.execute(payload.toCommand());
}
}