import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

import { LoginCommand } from './login.command';

export class LoginRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  login!: string;

  @IsString()
  @MaxLength(32)
  @ApiProperty()
  password!: string;

  @Allow()
  toCommand = () => {
    return new LoginCommand(this);
  };
}