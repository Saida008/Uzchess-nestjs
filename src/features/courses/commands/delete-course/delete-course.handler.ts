import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteCourseCommand } from './delete-course.command';
import { Course } from '../../entities/course.entity';

@CommandHandler(DeleteCourseCommand)
export class DeleteCourseHandler
  implements ICommandHandler<DeleteCourseCommand> {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}


  async execute({ id }: DeleteCourseCommand) {

    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    await this.courseRepository.remove(course);

    return {
      message: 'Course deleted successfully',
    };
  }
}