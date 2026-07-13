import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../../../entities/book.entity';
import { GetBookByIdQuery } from './get-book-by-id.query';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler
  implements IQueryHandler<GetBookByIdQuery>
{
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async execute({ id }: GetBookByIdQuery) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: {
        author: true,
        category: true,
        difficulty: true,
      },
    });

    if (!book) {
      throw new DoesNotExistException('Book');
    }

    return book;
  }
}