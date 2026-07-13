import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetAllCoursesQuery } from './get-all-courses.query';
import { GetAllCoursesResponse } from './get-all-courses.response';
import { Course } from '../../entities/course.entity';

@QueryHandler(GetAllCoursesQuery)
export class GetAllCoursesHandler
  implements IQueryHandler<GetAllCoursesQuery> {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async execute(): Promise<GetAllCoursesResponse[]> {

    const courses = await this.courseRepository.find({
      relations: {
        category: true,
      },
    });

    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
    }));
  }
}