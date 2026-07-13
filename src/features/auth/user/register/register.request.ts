import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Allow } from 'class-validator';

import { RegisterCommand } from './register.command';

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
 fullname: string;

 @Allow()
toCommand() {
  return new RegisterCommand({
    username: this.username,
    password: this.password,
    fullname: this.fullname,
  });
}
}