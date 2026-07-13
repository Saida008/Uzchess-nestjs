import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseLessonDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    video: string;

    
    @IsNotEmpty()
    courseId: number;
}