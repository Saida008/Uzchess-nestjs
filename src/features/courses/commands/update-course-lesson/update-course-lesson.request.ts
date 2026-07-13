import { IsOptional, IsString } from "class-validator";

export class UpdateCourseLessonRequest {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    video?: string;
}