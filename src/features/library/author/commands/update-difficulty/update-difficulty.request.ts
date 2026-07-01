import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateDifficultyCommand } from './update-difficulty.command';

export class UpdateDifficultyRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title?: string;

  toCommand(id: number) {
    return new UpdateDifficultyCommand(id, this.title);
  }
}