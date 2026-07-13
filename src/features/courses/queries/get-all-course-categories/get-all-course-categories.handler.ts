import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetAllCourseCategoriesQuery } from './get-all-course-categories.query';
import { GetAllCourseCategoriesResponse } from './get-all-course-categories.response';
import { CourseCategory } from '../../entities/course-category.entity';

@QueryHandler(GetAllCourseCategoriesQuery)
export class GetAllCourseCategoriesHandler
implements IQueryHandler<GetAllCourseCategoriesQuery> {

  constructor(
    @InjectRepository(CourseCategory)
    private readonly categoryRepository: Repository<CourseCategory>,
  ) {}


  async execute(): Promise<GetAllCourseCategoriesResponse[]> {

    const categories =
      await this.categoryRepository.find();


    return categories.map((category) => ({
      id: category.id,
      title: category.title,
    }));
  }

}