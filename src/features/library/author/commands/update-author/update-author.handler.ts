import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike, Not } from 'typeorm';

import { Author } from '../../../entities/author.entity';
import { UpdateAuthorCommand } from './update-author.command';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler
  implements ICommandHandler<UpdateAuthorCommand>
{
  async execute(command: UpdateAuthorCommand) {
    const author = await Author.findOneBy({
      id: command.id,
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    if (command.fullName) {
      const exists = await Author.existsBy({
        id: Not(author.id),
        fullName: ILike(command.fullName),
      });

      if (exists) {
        throw new ConflictException(
          'Author already exists',
        );
      }

      author.fullName = command.fullName;
    }

    await author.save();

    return author;
  }
}