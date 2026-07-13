import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { UpdateReviewCommand } from './update-review.command';

export class UpdateReviewRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  comment?: string;

  toCommand(userId: number, bookId: number) {
    return new UpdateReviewCommand(
      userId,
      bookId,
      this.rating,
      this.comment,
    );
  }
}