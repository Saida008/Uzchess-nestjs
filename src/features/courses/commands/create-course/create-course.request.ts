import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCourseRequest {

  @IsString()
  @MaxLength(128)
  title: string;


  @IsString()
  description: string;


  @IsString()
  image: string;


  @IsNumber()
  categoryId: number;
}