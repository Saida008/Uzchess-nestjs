import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {Type as NestType} from '@nestjs/common'
export class PaginatedResult<T> {
  @ApiProperty()
  @Expose()
  totalCount: number;

  @ApiProperty()
  @Expose()
  totalPages: number;

  @ApiProperty()
  @Expose()
  currentPage: number;

  @ApiProperty()
  @Expose()
  hasNext: boolean;

  @ApiProperty()
  @Expose()
  hasPrevious: boolean;

  @ApiProperty()
  @Expose()
  data: T[];
}

export function PaginatedResultDTO<T>(Dto: NestType<T>) {
  class PaginatedResultDto {
    @ApiProperty()
    @Expose()
    totalCount: number;

    @ApiProperty()
    @Expose()
    totalPages: number;

    @ApiProperty()
    @Expose()
    currentPage: number;

    @ApiProperty()
    @Expose()
    hasNext: boolean;

    @ApiProperty()
    @Expose()
    hasPrevious: boolean;

    @ApiProperty({
      type: () => Dto,
      isArray: true,
    })
    @Expose()
    data: T[];
  }

  return PaginatedResultDto;
}