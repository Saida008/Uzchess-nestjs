import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Author } from '../../../entities/author.entity';
import { DeleteAuthorCommand } from './delete-author.command';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler
  implements ICommandHandler<DeleteAuthorCommand>
{
  async execute(command: DeleteAuthorCommand) {
    const author = await Author.findOneBy({
      id: command.id,
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    await author.remove();

    return {
      message: "Author o'chirildi",
    };
  }
}