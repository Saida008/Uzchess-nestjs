import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";
import { UpdateBookCommand } from './update-book.command';
import { Type } from "class-transformer";

export class UpdateBookRequest {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(128)
    title?: string;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    authorId?: number;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    categoryId?: number;


    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    difficultyId?: number;


    toCommand(id: number) {
        return new UpdateBookCommand(
            id,
            this.title,
            this.authorId,
            this.categoryId,
            this.difficultyId,
        );
    }
}