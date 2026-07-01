import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { Difficulty } from '../entities/difficulty.entity';

import { CreateDifficultyRequest } from '../difficulty/commands/create-difficulty/create-difficulty.request';
import { UpdateDifficultyRequest } from '../difficulty/commands/update-difficulty/update-difficulty.request';
import { DeleteDifficultyCommand } from '../difficulty/commands/delete-difficulty/delete-difficulty.command';

@Controller('difficulty')
export class DifficultyController {
  constructor(private readonly cmdBus: CommandBus) {}

  @Post('create')
  async create(@Body() payload: CreateDifficultyRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDifficultyRequest,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id));
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteDifficultyCommand(id));
  }

  @Get('list')
  async getAll() {
    return await Difficulty.find();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await Difficulty.findOneBy({ id });
  }
}