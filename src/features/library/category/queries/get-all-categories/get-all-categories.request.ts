import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { GetAllCategoriesQuery } from './get-all-categories.query';
import { Type } from 'class-transformer';
import { Max } from 'class-validator';
export class GetAllCategoriesRequest {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @ApiProperty({required:false})
  search?: string;

@IsInt()
@IsOptional()
@Type(()=>Number)
@ApiProperty({required:false})
page?:number;


@IsInt()
@IsOptional()
@Max(100)
@Type(()=>Number)
@ApiProperty({required:false})
size?:number;


toQuery=()=>new GetAllCategoriesQuery(this.search, this.page, this.size);
}

