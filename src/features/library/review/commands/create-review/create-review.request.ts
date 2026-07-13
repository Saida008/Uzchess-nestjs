import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateReviewCommand } from './create-review.command';

export class CreateReviewRequest {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsString()
  @MaxLength(512)
  comment: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  bookId: number;

  toCommand(userId: number) {
    return new CreateReviewCommand(
      this.rating,
      this.comment,
      userId,
      this.bookId,
    );
  }
}