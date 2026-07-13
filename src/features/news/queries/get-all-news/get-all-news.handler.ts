import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '../../entities/news.entity';
import { GetAllNewsQuery } from './get-all-news.query';

@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler
  implements IQueryHandler<GetAllNewsQuery>
{
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  async execute() {
    return await this.newsRepo.find();
  }
}