import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../entities/book.entity';
import { CreateBookRequest } from '../book/commands/create-book/create-book.request';
import { DeleteBookCommand } from '../book/commands/delete-book/delete-book.command';

@Controller('book')
export class BookController {
  constructor(
    private readonly cmdBus: CommandBus,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateBookRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Get('list')
  async getAll() {
    return await this.bookRepo.find();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookRepo.findOne({
      where: { id },
    });
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteBookCommand(id));
  }
}