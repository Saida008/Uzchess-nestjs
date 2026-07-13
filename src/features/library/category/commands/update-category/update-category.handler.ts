import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike, Not } from 'typeorm';

import { Category } from '../../../entities/category.entity';
import { UpdateCategoryCommand } from './update-category.command';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  async execute(cmd: UpdateCategoryCommand) {
    const category = await Category.findOneBy({
      id: cmd.id,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (cmd.title) {
      const exists = await Category.existsBy({
        id: Not(category.id!),
        title: ILike(cmd.title),
      });

      if (exists) {
        throw new ConflictException(
          'Category already exists',
        );
      }

      category.title = cmd.title;
    }

    await category.save();

    return category;
  }
}