import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateCourseCommand } from './update-course.command';
import { Course } from '../../entities/course.entity';
import { CourseCategory } from '../../entities/course-category.entity';

@CommandHandler(UpdateCourseCommand)
export class UpdateCourseHandler
implements ICommandHandler<UpdateCourseCommand> {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(CourseCategory)
    private readonly categoryRepository: Repository<CourseCategory>,
  ) {}


  async execute({ id, payload }: UpdateCourseCommand) {

    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }


    if (payload.categoryId) {

      const category =
        await this.categoryRepository.findOne({
          where: {
            id: payload.categoryId,
          },
        });

      if (!category) {
        throw new Error('Category not found');
      }

      course.category = category;
    }


    Object.assign(course, {
      title: payload.title,
      description: payload.description,
      image: payload.image,
    });


    return await this.courseRepository.save(course);
  }
}