import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseCommand } from './create-course.command';
import { Course } from '../../entities/course.entity';
import { CourseCategory } from '../../entities/course-category.entity';

@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler
  implements ICommandHandler<CreateCourseCommand> {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(CourseCategory)
    private readonly categoryRepository: Repository<CourseCategory>,
  ) {}

  async execute({ payload }: CreateCourseCommand) {

    const category = await this.categoryRepository.findOne({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new Error('Course category not found');
    }

    const course = this.courseRepository.create({
      title: payload.title,
      description: payload.description,
      image: payload.image,
      category,
    });

    return await this.courseRepository.save(course);
  }
}