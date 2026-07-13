import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseReviewRequest {

  @IsNumber()
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  courseId: number;
}