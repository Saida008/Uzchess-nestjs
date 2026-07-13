import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from '../../../entities/review.entity';
import { GetBookReviewsQuery } from './get-book-reviews.query';

@QueryHandler(GetBookReviewsQuery)
export class GetBookReviewsHandler
  implements IQueryHandler<GetBookReviewsQuery>
{
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async execute({ bookId }: GetBookReviewsQuery) {
    return await this.reviewRepo.find({
      where: {
        book: {
          id: bookId,
        },
      },
      relations: {
        user: true,
        book: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}