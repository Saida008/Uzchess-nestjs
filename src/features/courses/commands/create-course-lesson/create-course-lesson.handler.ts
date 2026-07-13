import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseLessonCommand } from "./create-course-lesson.command";
import { CourseLesson } from "src/features/courses/entities/course-lesson.entity";
import { Course } from "src/features/courses/entities/course.entity";

@CommandHandler(CreateCourseLessonCommand)
export class CreateCourseLessonHandler
    implements ICommandHandler<CreateCourseLessonCommand> {

    constructor(
        @InjectRepository(CourseLesson)
        private readonly lessonRepository: Repository<CourseLesson>,

        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async execute(command: CreateCourseLessonCommand) {

        const { title, video, courseId } = command.payload;

        const course = await this.courseRepository.findOneBy({
            id: courseId,
        });

        if (!course) {
            throw new Error("Course not found");
        }

        const lesson = this.lessonRepository.create({
            title,
            video,
            course,
        });

        return await this.lessonRepository.save(lesson);
    }
}