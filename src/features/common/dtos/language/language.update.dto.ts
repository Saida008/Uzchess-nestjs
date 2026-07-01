import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class LanguageUpdateDto{
    @IsString()
    @MaxLength(64)
    @IsOptional()
    @ApiProperty({required:false})
    title?:string;


    @IsString()
    @MaxLength(64)
    @IsOptional()
    @ApiProperty({required:false})
    code?:string;


}