import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from './entities/news.entity';
import { NewsController } from './controllers/news.controller';

import { CreateNewsHandler } from './commands/create-news/create-news.handler';
import { UpdateNewsHandler } from './commands/update-news/update-news.handler';
import { DeleteNewsHandler } from './commands/delete-news/delete-news.handler';
import { GetAllNewsHandler } from './queries/get-all-news/get-all-news.handler';
import { GetNewsByIdHandler } from './queries/get-news-by-id/get-news-by-id.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      News,
    ]),
  ],

  controllers: [
    NewsController,
  ],

  providers: [
    CreateNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,
    GetAllNewsHandler,
    GetNewsByIdHandler,
  ],
})
export class NewsModule {}