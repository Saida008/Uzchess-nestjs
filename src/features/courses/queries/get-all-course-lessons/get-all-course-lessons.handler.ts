import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CourseLesson } from "../../entities/course-lesson.entity";
import { GetAllCourseLessonsQuery } from "./get-all-course-lessons-query";
import { GetAllCourseLessonsResponse } from "./get-all-course-lessons.response";

@QueryHandler(GetAllCourseLessonsQuery)
export class GetAllCourseLessonsHandler
  implements IQueryHandler<GetAllCourseLessonsQuery> {

  constructor(
    @InjectRepository(CourseLesson)
    private readonly lessonRepository: Repository<CourseLesson>,
  ) {}

  async execute(): Promise<GetAllCourseLessonsResponse[]> {

    return await this.lessonRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }
}