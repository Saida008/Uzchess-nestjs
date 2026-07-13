import { CreateCourseReviewRequest } from "./create-course-review.request";

export class CreateCourseReviewCommand {
  constructor(
    public readonly payload: CreateCourseReviewRequest,
  ) {}
}