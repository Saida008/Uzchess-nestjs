import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '../../entities/news.entity';
import { CreateNewsCommand } from './create-news.command';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler
  implements ICommandHandler<CreateNewsCommand>
{
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  async execute({
    title,
    description,
    image,
  }: CreateNewsCommand) {
    const news = this.newsRepo.create({
      title,
      description,
      image,
    });

    return await this.newsRepo.save(news);
  }
}