import { UpdateCourseCategoryRequest } from './update-course-category.request';

export class UpdateCourseCategoryCommand {

  constructor(
    public readonly id: number,
    public readonly payload: UpdateCourseCategoryRequest,
  ) {}

}