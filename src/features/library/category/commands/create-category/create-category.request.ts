import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateCategoryCommand } from './create-category.command';

export class CreateCategoryRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title: string;

  toCommand() {
    return new CreateCategoryCommand(this.title);
  }
}