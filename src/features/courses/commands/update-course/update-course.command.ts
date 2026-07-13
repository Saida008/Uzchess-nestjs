import { UpdateCourseRequest } from './update-course.request';

export class UpdateCourseCommand {

  constructor(
    public readonly id: number,
    public readonly payload: UpdateCourseRequest,
  ) {}

}