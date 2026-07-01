import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateAuthorCommand } from './update-author.command';

export class UpdateAuthorRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  fullName?: string;

  toCommand(id: number) {
    return new UpdateAuthorCommand(id, this.fullName);
  }
}