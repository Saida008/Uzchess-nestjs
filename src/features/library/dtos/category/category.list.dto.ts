import { Expose } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';
export class CategoryListDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

}