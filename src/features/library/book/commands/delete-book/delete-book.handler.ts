import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Book } from '../../../entities/book.entity';
import { DeleteBookCommand } from './delete-book.command';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler
  implements ICommandHandler<DeleteBookCommand>
{
  async execute(cmd: DeleteBookCommand) {
    const book = await Book.findOneBy({
      id: cmd.id,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await book.remove();

    return {
      message: "Book o'chirildi",
    };
  }
}