import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateDifficultyCommand } from './create-difficulty.command';

export class CreateDifficultyRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title: string;

  toCommand() {
    return new CreateDifficultyCommand(this.title);
  }
}