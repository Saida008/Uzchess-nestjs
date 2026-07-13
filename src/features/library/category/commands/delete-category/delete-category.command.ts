import { DeleteCategoryRequest } from './delete-category.request';

export class DeleteCategoryCommand {
  constructor(
    public readonly id:number
  ) {}
}