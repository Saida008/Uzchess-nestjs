import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '../../entities/news.entity';
import { UpdateNewsCommand } from './update-news.command';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler
  implements ICommandHandler<UpdateNewsCommand>
{
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  async execute({
    id,
    title,
    description,
  }: UpdateNewsCommand) {
    const news = await this.newsRepo.findOneBy({ id });

    if (!news) {
      throw new DoesNotExistException('News');
    }

    if (title !== undefined) {
      news.title = title;
    }

    if (description !== undefined) {
      news.description = description;
    }

    return await this.newsRepo.save(news);
  }
}