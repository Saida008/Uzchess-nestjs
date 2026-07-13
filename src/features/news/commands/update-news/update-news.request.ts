import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

import { UpdateNewsCommand } from './update-news.command';

export class UpdateNewsRequest {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  toCommand(id: number) {
    return new UpdateNewsCommand(
      id,
      this.title,
      this.description,
    );
  }
}