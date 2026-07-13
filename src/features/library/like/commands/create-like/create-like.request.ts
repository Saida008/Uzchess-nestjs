import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateLikeCommand } from './create-like.command';

export class CreateLikeRequest {

  @ApiProperty()
  @IsInt()
  bookId: number;


  toCommand(userId: number) {
    return new CreateLikeCommand(
      userId,
      this.bookId,
    );
  }
}