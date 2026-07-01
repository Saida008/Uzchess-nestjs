import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';
import { CreateBookCommand } from './create-book.command';

export class CreateBookRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  title: string;

  @ApiProperty()
  @IsInt()
  authorId: number;

  @ApiProperty()
  @IsInt()
  categoryId: number;

  @ApiProperty()
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