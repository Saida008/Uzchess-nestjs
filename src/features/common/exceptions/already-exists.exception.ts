import { ConflictException } from '@nestjs/common';

export class AlreadyExistsException extends ConflictException {
  static ThrowIf(condition: boolean, message = 'Already exists') {
    if (condition) {
      throw new AlreadyExistsException(message);
    }
  }
}