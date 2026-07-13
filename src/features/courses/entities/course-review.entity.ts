import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "@/core/configs/base.model";
import { Course } from "./course.entity";

@Entity("courseReviews")
export class CourseReview extends BaseModel {

  @Column()
  rating: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @ManyToOne(() => Course, (course) => course.reviews, {
    onDelete: "CASCADE",
  })
  course: Course;
}