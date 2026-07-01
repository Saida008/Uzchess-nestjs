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
  async execute(command: UpdateDifficultyCommand) {
    const difficulty = await Difficulty.findOneBy({
      id: command.id,
    });

    if (!difficulty) {
      throw new NotFoundException('Difficulty not found');
    }

    if (command.title) {
      const exists = await Difficulty.existsBy({
        id: Not(difficulty.id),
        title: ILike(command.title),
      });

      if (exists) {
        throw new ConflictException(
          'Difficulty already exists',
        );
      }

      difficulty.title = command.title;
    }

    await difficulty.save();

    return difficulty;
  }
}