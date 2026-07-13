import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '../../entities/news.entity';
import { GetNewsByIdQuery } from './get-news-by-id.query';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@QueryHandler(GetNewsByIdQuery)
export class GetNewsByIdHandler
  implements IQueryHandler<GetNewsByIdQuery>
{
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  async execute({ id }: GetNewsByIdQuery) {
    const news = await this.newsRepo.findOneBy({ id });

    if (!news) {
      throw new DoesNotExistException('News');
    }

    return news;
  }
}