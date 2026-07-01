import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Difficulty } from '../../../entities/difficulty.entity';
import { DeleteDifficultyCommand } from './delete-difficulty.command';

@CommandHandler(DeleteDifficultyCommand)
export class DeleteDifficultyHandler
  implements ICommandHandler<DeleteDifficultyCommand>
{
  async execute(cmd: DeleteDifficultyCommand) {
    const difficulty = await Difficulty.findOneBy({
      id: cmd.id,
    });

    if (!difficulty) {
      throw new NotFoundException('Difficulty not found');
    }

    await difficulty.remove();

    return {
      message: "Difficulty o'chirildi",
    };
  }
}