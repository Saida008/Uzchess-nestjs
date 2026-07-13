import { CreateCourseCategoryRequest } from './create-course-category.request';

export class CreateCourseCategoryCommand {

  constructor(
    public readonly payload: CreateCourseCategoryRequest,
  ) {}

}