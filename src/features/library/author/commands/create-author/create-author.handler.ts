import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';

import { Author } from '../../../entities/author.entity';
import { CreateAuthorCommand } from './create-author.command';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler
  implements ICommandHandler<CreateAuthorCommand>
{
  async execute(command: CreateAuthorCommand) {
    const exists = await Author.existsBy({
      fullName: ILike(command.fullName),
    });

    if (exists) {
      throw new ConflictException('Author already exists');
    }

    const author = Author.create({
      fullName: command.fullName,
    });

    await author.save();

    return author;
  }
}