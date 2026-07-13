import { Category } from "@features/library/entities/category.entity";
import { DeleteCategoryCommand } from "./delete-category.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {

  async execute(cmd: DeleteCategoryCommand) {
    const category = await Category.findOne({
      where: {
        id: cmd.id,
      },
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    await Category.remove(category);

    return {
      success: true,
    };
  }
}