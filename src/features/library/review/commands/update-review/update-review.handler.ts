import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from '../../../entities/review.entity';
import { UpdateReviewCommand } from './update-review.command';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler
  implements ICommandHandler<UpdateReviewCommand>
{
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async execute({
    userId,
    bookId,
    rating,
    comment,
  }: UpdateReviewCommand) {
    const review = await this.reviewRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: {
        user: true,
        book: true,
      },
    });

    if (!review) {
      throw new DoesNotExistException('Review');
    }

    if (rating !== undefined) {
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    return await this.reviewRepo.save(review);
  }
}