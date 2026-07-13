import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';

import { CreateNewsCommand } from './create-news.command';

export class CreateNewsRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @Allow()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  image?: Express.Multer.File;

  toCommand(image: string) {
    return new CreateNewsCommand(
      this.title,
      this.description,
      image,
    );
  }
}