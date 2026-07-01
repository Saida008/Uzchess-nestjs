import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike, Not } from 'typeorm';

import { Difficulty } from '../../../entities/difficulty.entity';
import { UpdateDifficultyCommand } from './update-difficulty.command';

@CommandHandler(UpdateDifficultyCommand)
export class UpdateDifficultyHandler
  implements ICommandHandler<UpdateDifficultyCommand>
{
  async execute(cmd: UpdateDifficultyCommand) {
    const difficulty = await Difficulty.findOneBy({
      id: cmd.id,
    });

    if (!difficulty) {
      throw new NotFoundException('Difficulty not found');
    }

    if (cmd.title) {
      const exists = await Difficulty.existsBy({
        id: Not(cmd.id),
        title: ILike(cmd.title),
      });

      if (exists) {
        throw new ConflictException('Difficulty already exists');
      }

      difficulty.title = cmd.title;
    }

    await Difficulty.save(difficulty);

    return difficulty;
  }
}