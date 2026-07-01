import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import { Category } from '../entities/category.entity';
import { CategoryListDto } from '../dtos/category/category.list.dto';
import { CategoryUpdateDto } from '../dtos/category/category.update.dto';
import { CreateCategoryRequest } from '../category/commands/create-category/create-category.request';

@Controller('category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly cmdBus: CommandBus) {}

  @Get('list')
  async getAll() {
    const categories = await Category.find();

    return plainToInstance(CategoryListDto, categories, {
      excludeExtraneousValues: true,
    });
  }

  @Post('create')
  async create(@Body() payload: CreateCategoryRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await Category.findOneBy({ id });
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
    const category = await Category.findOneBy({ id });

    if (!category) {
      return {
        message: 'Category topilmadi',
      };
    }

    await category.remove();

    return {
      message: "Category o'chirildi",
    };
  }
}