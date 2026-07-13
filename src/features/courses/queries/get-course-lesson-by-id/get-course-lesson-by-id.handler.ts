import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CourseLesson } from "../../entities/course-lesson.entity";
import { GetCourseLessonByIdQuery } from "./get-course-lesson-by-id.query";
import { GetCourseLessonByIdResponse } from "./get-course-lesson-by-id.response";

@QueryHandler(GetCourseLessonByIdQuery)
export class GetCourseLessonByIdHandler
  implements IQueryHandler<GetCourseLessonByIdQuery> {

  constructor(
    @InjectRepository(CourseLesson)
    private readonly lessonRepository: Repository<CourseLesson>,
  ) {}

  async execute({
    id,
  }: GetCourseLessonByIdQuery): Promise<GetCourseLessonByIdResponse> {

    const lesson = await this.lessonRepository.findOne({
      where: { id },
    });

    if (!lesson) {
      throw new Error("Course lesson not found");
    }

    return lesson;
  }
}