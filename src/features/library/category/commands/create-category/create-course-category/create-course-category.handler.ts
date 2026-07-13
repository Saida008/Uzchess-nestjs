import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseCategoryCommand } from './create-course-category.command';
import { CourseCategory } from '@/features/courses/entities/course-category.entity';

@CommandHandler(CreateCourseCategoryCommand)
export class CreateCourseCategoryHandler
  implements ICommandHandler<CreateCourseCategoryCommand> {

  constructor(
    @InjectRepository(CourseCategory)
    private readonly categoryRepository: Repository<CourseCategory>,
  ) {}


  async execute({ payload }: CreateCourseCategoryCommand) {

    const category = this.categoryRepository.create({
      title: payload.title,
    });

    return await this.categoryRepository.save(category);
  }
}