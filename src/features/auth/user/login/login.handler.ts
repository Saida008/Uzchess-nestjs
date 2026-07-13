import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { LoginCommand } from './login.command';
import { User } from '../../entities/user.entity';
import { DoesNotExistException } from '@/features/common/exceptions/does-not-exists.exception';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async execute({ payload }: LoginCommand) {
    const user = await User.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.username = :username', {
    username: payload.login,
  })
  .getOne();

    DoesNotExistException.ThrowIfNull(
      user,
      'Username or Password is incorrect',
    );

    const passwordsMatch = await argon2.verify(
      user!.password,
      payload.password,
    );
  
    DoesNotExistException.ThrowIfNot(
      passwordsMatch,
      'Username or Password is incorrect',
    );

    const jwtPayload = {
      id: user!.id,
    };

    const accessToken = this.jwtService.sign(jwtPayload);

    return {
      accessToken,
    };
  }
}
//     if (!user) {
//       throw new NotFoundException(
//         'Username or password is incorrect',
//       );
//     }

//     if (user.password !== payload.password) {
//       throw new UnauthorizedException(
//         'Username or password is incorrect',
//       );
//     }

//     return user;
//   }
// }