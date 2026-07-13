import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CourseLesson } from "../../entities/course-lesson.entity";
import { UpdateCourseLessonCommand } from "./update-course-lesson.command";

@CommandHandler(UpdateCourseLessonCommand)
export class UpdateCourseLessonHandler
  implements ICommandHandler<UpdateCourseLessonCommand> {

  constructor(
    @InjectRepository(CourseLesson)
    private readonly lessonRepository: Repository<CourseLesson>,
  ) {}

  async execute({ id, payload }: UpdateCourseLessonCommand) {

    const lesson = await this.lessonRepository.findOne({
      where: { id },
    });

    if (!lesson) {
      throw new Error("Course lesson not found");
    }

    Object.assign(lesson, payload);

    return await this.lessonRepository.save(lesson);
  }
}