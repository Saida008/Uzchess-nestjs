import * as argon2 from 'argon2';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from './register.command';
import { User } from '../../entities/user.entity';
import { Role } from '@core/enums/role.enum';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  async execute({ payload }: RegisterCommand) {
    const alreadyExists = await User.findOneBy({
      username: payload.username,
    });

    if (alreadyExists) {
      throw new ConflictException('Username already exists');
    }

    const user = User.create({
      username: payload.username,
      password: await argon2.hash(payload.password),
      fullname: payload.fullname,
      role: Role.User,
    });

    return await User.save(user);
  }
}