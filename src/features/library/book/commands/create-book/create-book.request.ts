import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';
import { CreateBookCommand } from './create-book.command';

export class CreateBookRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  title: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  authorId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  categoryId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  difficultyId: number;

  toCommand() {
    return new CreateBookCommand(
      this.title,
      this.authorId,
      this.categoryId,
      this.difficultyId,
    );
  }
}