import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../../../entities/book.entity';
import { GetAllBooksQuery } from './get-all-books.query';

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler
  implements IQueryHandler<GetAllBooksQuery>
{
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async execute() {
    return await this.bookRepo.find({
      relations: {
        author: true,
        category: true,
        difficulty: true,
      },
    });
  }
}