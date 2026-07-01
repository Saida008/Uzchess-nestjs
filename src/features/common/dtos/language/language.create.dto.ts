import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class LanguageCreateDto{
    @IsString()
    @MaxLength(64)
    @IsOptional()
    @ApiProperty()
    title?:string;


    @IsString()
    @MaxLength(64)
    @IsOptional()
    @ApiProperty()
    code?:string;
}