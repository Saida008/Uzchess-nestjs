
import { GetAllCategoriesQuery } from "./get-all-categories.query";
import { FindOptionsWhere, ILike } from "typeorm";
import { Category } from "@features/library/entities/category.entity";
import { Expose, plainToInstance } from "class-transformer";
import {GetAllCategoriesResponse} from "./get-all-categories.response"
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { Type as NestType } from "@nestjs/common";
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


export function PaginatedResulDto<T>(Dto:NestType<T>){
    class PaginatedResult<T>
{
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

    @ApiProperty({type:[Dto]})
    @Expose()
    data: T[];
}   
return PaginatedResult
}

@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoriesHandler implements IQueryHandler<GetAllCategoriesQuery>{
    async execute(query: GetAllCategoriesQuery) {
         const take =query.size ?? 10
         const currentPage=query.page ?? 1;
         const skip=(currentPage-1)*take;

            const where :FindOptionsWhere<Category>={};
              if(query.search)
                where.title=ILike(`%${query.search}%`);
            const totalCount=await Category.countBy(where)
            const totalPages=Math.ceil(totalCount/take);
            const hasNext=currentPage<totalPages;
            const hasPrevious=currentPage>1;
            const categories=await Category.find({where:where, skip:skip, take:take});
            const data =plainToInstance(GetAllCategoriesResponse, categories, {excludeExtraneousValues:true})
            return {
    totalCount,
    totalPages,
    currentPage,
    hasNext,
    hasPrevious,
    data,
} as PaginatedResult<GetAllCategoriesResponse>;
         }
    }
