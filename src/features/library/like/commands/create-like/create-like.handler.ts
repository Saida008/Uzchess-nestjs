import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from '../../../entities/like.entity';
import { User } from '@/features/auth/entities/user.entity';
import { Book } from '../../../entities/book.entity';

import { CreateLikeCommand } from './create-like.command';

@CommandHandler(CreateLikeCommand)
export class CreateLikeHandler
  implements ICommandHandler<CreateLikeCommand>
{
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async execute(cmd: CreateLikeCommand) {

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


    const exists = await this.likeRepo.findOne({
      where: {
        user: { id: cmd.userId },
        book: { id: cmd.bookId },
      },
    });

    if (exists) {
      throw new ConflictException('Already liked');
    }


    const like = this.likeRepo.create({
      user,
      book,
    });

    return await this.likeRepo.save(like);
  }
}