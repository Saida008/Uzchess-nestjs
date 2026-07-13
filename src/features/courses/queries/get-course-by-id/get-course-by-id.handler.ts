import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetCourseByIdQuery } from './get-course-by-id.query';
import { GetCourseByIdResponse } from './get-course-by-id.response';
import { Course } from '../../entities/course.entity';

@QueryHandler(GetCourseByIdQuery)
export class GetCourseByIdHandler
  implements IQueryHandler<GetCourseByIdQuery> {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async execute(
    { id }: GetCourseByIdQuery,
  ): Promise<GetCourseByIdResponse> {

    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
    };
  }
}