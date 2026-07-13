import { IsString, MaxLength } from 'class-validator';

export class CreateCourseCategoryRequest {

  @IsString()
  @MaxLength(64)
  title: string;

}