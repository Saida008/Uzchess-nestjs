import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCourseCategoryRequest {

  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

}