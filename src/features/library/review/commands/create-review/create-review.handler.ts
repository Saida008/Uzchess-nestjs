import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from '../../../entities/review.entity';
import { User } from '@/features/auth/entities/user.entity';
import { Book } from '../../../entities/book.entity';

import { CreateReviewCommand } from './create-review.command';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler
  implements ICommandHandler<CreateReviewCommand>
{
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async execute(cmd: CreateReviewCommand) {
    const user = await this.userRepo.findOneBy({
      id: cmd.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookRepo.findOneBy({
      id: cmd.bookId,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const exists = await this.reviewRepo.findOne({
      where: {
        user: { id: cmd.userId },
        book: { id: cmd.bookId },
      },
    });

    if (exists) {
      throw new ConflictException('Review already exists');
    }

    const review = this.reviewRepo.create({
      rating: cmd.rating,
      comment: cmd.comment,
      user,
      book,
    });

    return await this.reviewRepo.save(review);
  }
}