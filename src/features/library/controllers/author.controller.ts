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
import { CommandBus } from '@nestjs/cqrs';

import { Author } from '../entities/author.entity';

import { CreateAuthorRequest } from '../author/commands/create-author/create-author.request';
import { UpdateAuthorRequest } from '../author/commands/update-author/update-author.request';
import { DeleteAuthorCommand } from '../author/commands/delete-author/delete-author.command';

@Controller('author')
export class AuthorController {
  constructor(private readonly cmdBus: CommandBus) {}

  @Post('create')
  async create(@Body() payload: CreateAuthorRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAuthorRequest,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id));
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteAuthorCommand(id));
  }

  @Get('list')
  async getAll() {
    return await Author.find();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await Author.findOneBy({ id });
  }
}