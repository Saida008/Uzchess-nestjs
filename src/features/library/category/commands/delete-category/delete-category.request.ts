import { DeleteCategoryCommand } from './delete-category.command';

export class DeleteCategoryRequest {
  id: number;

  toCommand() {
    return new DeleteCategoryCommand(this.id);
  }
}