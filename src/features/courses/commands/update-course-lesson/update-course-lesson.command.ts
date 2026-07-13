import { UpdateCourseLessonRequest } from "./update-course-lesson.request";

export class UpdateCourseLessonCommand {
    constructor(
        public readonly id: string,
        public readonly payload: UpdateCourseLessonRequest,
    ) {}
}