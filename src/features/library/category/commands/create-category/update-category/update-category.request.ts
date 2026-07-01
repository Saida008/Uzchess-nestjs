import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { UpdateCategoryCommand } from "./update-category.command";

export class UpdateCategoryHandler{
    @ApiProperty()
    @IsString()
    @MaxLength(64)
    @IsOptional()
    title?:string;

    toCommand(id:number){
        return new UpdateCategoryCommand(id, this.title)
    }
}

//Class
//Member=>Data(o'zgaruvchi)/method(funksiya)
//Memberlar 2 xil boladi:instance, class/static member