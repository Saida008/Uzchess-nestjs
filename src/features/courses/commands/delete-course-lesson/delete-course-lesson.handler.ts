import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CourseLesson } from "../../entities/course-lesson.entity";
import { DeleteCourseLessonCommand } from "./delete-course-lesson.command";

@CommandHandler(DeleteCourseLessonCommand)
export class DeleteCourseLessonHandler
  implements ICommandHandler<DeleteCourseLessonCommand> {

  constructor(
    @InjectRepository(CourseLesson)
    private readonly lessonRepository: Repository<CourseLesson>,
  ) {}

  async execute({ id }: DeleteCourseLessonCommand) {

    const lesson = await this.lessonRepository.findOne({
      where: { id },
    });

    if (!lesson) {
      throw new Error("Course lesson not found");
    }

    await this.lessonRepository.remove(lesson);

    return {
      message: "Course lesson deleted successfully",
    };
  }
}