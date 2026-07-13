import { CreateCourseRequest } from './create-course.request';

export class CreateCourseCommand {
  constructor(
    public readonly payload: CreateCourseRequest,
  ) {}
}