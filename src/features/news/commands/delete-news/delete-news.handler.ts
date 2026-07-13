import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '../../entities/news.entity';
import { DeleteNewsCommand } from './delete-news.command';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler
  implements ICommandHandler<DeleteNewsCommand>
{
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  async execute({ id }: DeleteNewsCommand) {
    const news = await this.newsRepo.findOneBy({ id });

    if (!news) {
      throw new DoesNotExistException('News');
    }

    await this.newsRepo.remove(news);

    return {
      message: 'News deleted successfully',
    };
  }
}