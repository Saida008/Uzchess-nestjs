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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../entities/book.entity';
import { CreateBookRequest } from '../book/commands/create-book/create-book.request';
import { DeleteBookCommand } from '../book/commands/delete-book/delete-book.command';
import { UpdateBookRequest } from '../book/commands/update-book/update-book.request';
import { GetAllBooksQuery } from '../book/queries/get-all-books/get-all-books.query';
import { GetBookByIdQuery } from '../book/queries/get-book-by-id/get-book-by-id.query';
@Controller('book')
export class BookController {
  constructor(
    private readonly cmdBus: CommandBus,
    private readonly queryBus:QueryBus,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateBookRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Get('list')
  async getAll() {
    return await this.queryBus.execute(
      new GetAllBooksQuery()
    )
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookRepo.findOne({
      where: { id },
      relations: ['author', 'category', 'difficulty'],
    });
  }
  @Patch('update/:id')
   async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() payload: UpdateBookRequest,
) {
  return await this.cmdBus.execute(payload.toCommand(id));
}


  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteBookCommand(id));
  }
}