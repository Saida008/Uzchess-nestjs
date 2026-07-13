import {
  Body,
  Controller,
  Post,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateLikeRequest } from '../like/commands/create-like/create-like.request';
import { DeleteLikeCommand } from '../like/commands/delete-like/delete-like.command';
import { Request } from '@nestjs/common';
@Controller('like')
export class LikeController {

  constructor(
    private readonly cmdBus: CommandBus,
  ) {}
@Post('create')
async create(
  @Body() payload: CreateLikeRequest,
  @Request() req,
) {
  return await this.cmdBus.execute(
    payload.toCommand(req.user.id)
  );
}

@Delete('delete/:bookId')
async delete(
  @Param('bookId', ParseIntPipe) bookId: number,
) {
  return await this.cmdBus.execute(
    new DeleteLikeCommand(4, bookId),
  );
}
}