import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CategoryUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title?: string;
}