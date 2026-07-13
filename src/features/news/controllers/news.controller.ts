import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { multerStorageOptions } from '@/core/configs/multer.config';
import { CreateNewsRequest } from '../commands/create-news/create-news.request';
import { Patch, Param, ParseIntPipe } from '@nestjs/common';
import { UpdateNewsRequest } from '../commands/update-news/update-news.request';
import { Delete } from '@nestjs/common';
import { DeleteNewsCommand } from '../commands/delete-news/delete-news.command';
import { Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetAllNewsQuery } from '../queries/get-all-news/get-all-news.query';
import { GetNewsByIdQuery } from '../queries/get-news-by-id/get-news-by-id.query';
@Controller('news')
export class NewsController {
  constructor(
    private readonly cmdBus: CommandBus,
    private readonly queryBus:QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerStorageOptions({
        destination: 'news',
        extensions: ['png', 'jpg', 'jpeg', 'webp'],
      }),
    ),
  )
  async create(
    @Body() payload: CreateNewsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image required');
    }

    return await this.cmdBus.execute(
      payload.toCommand(image.path),
    );
  }

     @Get('list')
  async getAll() {
  return await this.queryBus.execute(
    new GetAllNewsQuery(),
  );
}

    @Get(':id')
  async getOne(
  @Param('id', ParseIntPipe) id: number,
) {
  return await this.queryBus.execute(
    new GetNewsByIdQuery(id),
  );
}

     @Patch('update/:id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsRequest,
  ) {
    return await this.cmdBus.execute(
      payload.toCommand(id),
    );
  }
  
  @Delete('delete/:id')
  async delete(
  @Param('id', ParseIntPipe) id: number,
) {
  return await this.cmdBus.execute(
    new DeleteNewsCommand(id),
  );
}

     
}