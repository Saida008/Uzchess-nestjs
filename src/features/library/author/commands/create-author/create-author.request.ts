import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateAuthorCommand } from './create-author.command';

export class CreateAuthorRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName: string;

  toCommand() {
    return new CreateAuthorCommand(this.fullName);
  }
}