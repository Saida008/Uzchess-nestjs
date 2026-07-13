import { CreateCourseLessonDto } from "./create-course-lesson.dto";

export class CreateCourseLessonCommand {
    constructor(
        public readonly payload: CreateCourseLessonDto,
    ) {}
}