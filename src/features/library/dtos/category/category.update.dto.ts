import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateCategoryCommand } from '../../category/commands/update-category/update-category.command';

export class CategoryUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  title?: string;

    toCommand(id: number) {
    return new UpdateCategoryCommand(id, this.title);
  }
}