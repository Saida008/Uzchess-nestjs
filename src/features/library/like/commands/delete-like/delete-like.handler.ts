import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteLikeCommand } from './delete-like.command';
import { Like } from '../../../entities/like.entity';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@CommandHandler(DeleteLikeCommand)
export class DeleteLikeHandler
  implements ICommandHandler<DeleteLikeCommand>
{
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async execute({ userId, bookId }: DeleteLikeCommand) {
    const like = await this.likeRepo.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
      },
      relations: {
        user: true,
        book: true,
      },
    });

    if (!like) {
      throw new DoesNotExistException('Like');
    }

    await this.likeRepo.remove(like);

    return {
      message: 'Like deleted successfully',
    };
  }
}