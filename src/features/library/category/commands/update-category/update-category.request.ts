import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

import { UpdateCategoryCommand } from './update-category.command';

export class UpdateCategoryRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title?: string;

  toCommand(id: number) {
    return new UpdateCategoryCommand(
      id,
      this.title,
    );
  }
}