import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILike } from 'typeorm';

import { Difficulty } from '../../entities/difficulty.entity';
import { CreateDifficultyCommand } from './create-difficulty.command';

@CommandHandler(CreateDifficultyCommand)
export class CreateDifficultyHandler
  implements ICommandHandler<CreateDifficultyCommand>
{
  async execute(command: CreateDifficultyCommand) {
    const exists = await Difficulty.existsBy({
      title: ILike(command.title),
    });

    if (exists) {
      throw new ConflictException('Difficulty already exists');
    }

    const difficulty = Difficulty.create({
      title: command.title,
    });

    await difficulty.save();

    return difficulty;
  }
}