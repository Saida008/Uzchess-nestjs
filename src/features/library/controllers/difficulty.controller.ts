import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';

import { Difficulty } from '../entities/difficulty.entity';

import { CreateDifficultyRequest } from '../difficulty/commands/create-difficulty/create-difficulty.request';
import { UpdateDifficultyRequest } from '../difficulty/commands/update-difficulty/update-difficulty.request';
import { DeleteDifficultyCommand } from '../difficulty/commands/delete-difficulty/delete-difficulty.command';

import { multerStorageOptions } from '@core/configs/multer.config';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('difficulty')
export class DifficultyController {
  constructor(
    private readonly cmdBus: CommandBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'icon',
      multerStorageOptions({
        destination: 'icons',
        extensions: ['png'],
      }),
    ),
  )
  async create(
    @Body() payload: CreateDifficultyRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    if (!icon) {
      throw new BadRequestException('icon required');
    }

    return await this.cmdBus.execute(
      payload.toCommand(icon.path),
    );
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDifficultyRequest,
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
      new DeleteDifficultyCommand(id),
    );
  }

  @Get('list')
  async getAll() {
    return await Difficulty.find();
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await Difficulty.findOneBy({ id });
  }
}