import { BaseModel } from "@/core/configs/base.model"
import { Column, Entity} from "typeorm"

@Entity('courseCategories')
export class CourseCategory extends BaseModel{
    @Column({length:64})
    title:string;
}