import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateCourseCategoryCommand } from './update-course-category.command';
import { CourseCategory } from '../../entities/course-category.entity';


@CommandHandler(UpdateCourseCategoryCommand)
export class UpdateCourseCategoryHandler
implements ICommandHandler<UpdateCourseCategoryCommand> {

  constructor(
    @InjectRepository(CourseCategory)
    private readonly categoryRepository: Repository<CourseCategory>,
  ) {}


  async execute({ id, payload }: UpdateCourseCategoryCommand) {

    const category =
      await this.categoryRepository.findOne({
        where: {
          id,
        },
      });


    if (!category) {
      throw new Error('Course category not found');
    }


    Object.assign(category, {
      title: payload.title,
    });


    return await this.categoryRepository.save(category);
  }

}