import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Allow } from 'class-validator';
import { CreateDifficultyCommand } from './create-difficulty.command';

export class CreateDifficultyRequest {
  @IsString()
  @MaxLength(32)
  @ApiProperty()
  title: string;

  @Allow()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  icon?: Express.Multer.File;

  toCommand(icon: string) {
    return new CreateDifficultyCommand(
      this.title,
      icon,
    );
  }
}