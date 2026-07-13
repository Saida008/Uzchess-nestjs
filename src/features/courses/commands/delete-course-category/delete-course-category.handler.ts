import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteCourseCategoryCommand } from './delete-course-category.command';
import { CourseCategory } from '../../entities/course-category.entity';


@CommandHandler(DeleteCourseCategoryCommand)
export class DeleteCourseCategoryHandler
implements ICommandHandler<DeleteCourseCategoryCommand> {

  constructor(
    @InjectRepository(CourseCategory)
    private readonly categoryRepository: Repository<CourseCategory>,
  ) {}


  async execute({ id }: DeleteCourseCategoryCommand) {

    const category =
      await this.categoryRepository.findOne({
        where: {
          id,
        },
      });


    if (!category) {
      throw new Error('Course category not found');
    }


    await this.categoryRepository.remove(category);


    return {
      message: 'Course category deleted successfully',
    };
  }

}