import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCourseRequest {

  @IsString()
  @MaxLength(128)
  @IsOptional()
  title?: string;


  @IsString()
  @IsOptional()
  description?: string;


  @IsString()
  @IsOptional()
  image?: string;


  @IsNumber()
  @IsOptional()
  categoryId?: number;
}