import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCourseReviewCommand } from "./create-course-review.command";
import { CourseReview } from "@/features/courses/entities/course-review.entity";
import { Course } from "@/features/courses/entities/course.entity";

@CommandHandler(CreateCourseReviewCommand)
export class CreateCourseReviewHandler
  implements ICommandHandler<CreateCourseReviewCommand> {

  constructor(
    @InjectRepository(CourseReview)
    private readonly reviewRepository: Repository<CourseReview>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async execute({ payload }: CreateCourseReviewCommand) {

    const course = await this.courseRepository.findOne({
      where: {
        id: payload.courseId,
      },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    const review = this.reviewRepository.create({
      rating: payload.rating,
      comment: payload.comment,
      course,
    });

    return await this.reviewRepository.save(review);
  }
}