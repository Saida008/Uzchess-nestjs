import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Request,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateReviewRequest } from '../review/commands/create-review/create-review.request';
import { DeleteReviewCommand } from '../review/commands/delete-review/delete-review.command';
import { Put } from '@nestjs/common';
import { UpdateReviewRequest } from '../review/commands/update-review/update-review.request';
import { Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetBookReviewsQuery } from '../review/queries/get-book-reviews/get-book-reviews.query';
import { AuthGuard } from '@/features/auth/auth.guard';

@Controller('review')
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(
    private readonly cmdBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('book/:bookId')
 async getBookReviews(
  @Param('bookId', ParseIntPipe) bookId: number,
) {
  return await this.queryBus.execute(
    new GetBookReviewsQuery(bookId),
  );
}
   
  @Post('create')
  async create(
  @Body() payload: CreateReviewRequest,
  @Request() req,
) {
  return await this.cmdBus.execute(
    payload.toCommand(req.user.id),
  );
}

  @Delete(':bookId')
 async delete(
  @Param('bookId', ParseIntPipe) bookId: number,
  @Request() req,
) {
  return await this.cmdBus.execute(
    new DeleteReviewCommand(req.user.id, bookId),
  );
}
  @Put(':bookId')
  async update(
  @Param('bookId', ParseIntPipe) bookId: number,
  @Body() payload: UpdateReviewRequest,
  @Request() req,
) {
  return await this.cmdBus.execute(
    payload.toCommand(req.user.id, bookId),
  );
}

  }
