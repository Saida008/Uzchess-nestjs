import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteReviewCommand } from './delete-review.command';
import { Review } from '../../../entities/review.entity';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler
  implements ICommandHandler<DeleteReviewCommand>
{
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async execute({ userId, bookId }: DeleteReviewCommand) {
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

    await this.reviewRepo.remove(review);

    return {
      message: 'Review deleted successfully',
    };
  }
}