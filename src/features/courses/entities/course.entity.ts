import { BaseModel } from '@/core/configs/base.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CourseCategory } from './course-category.entity';

import { OneToMany } from "typeorm";
import { CourseLesson } from "./course-lesson.entity";
import { CourseReview } from './course-review.entity';
@Entity('courses')
export class Course extends BaseModel {

  @Column({ length: 128 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => CourseCategory)
  @JoinColumn({ name: 'categoryId' })
  category: CourseCategory;

  @OneToMany(() => CourseLesson, (lesson) => lesson.course)
lessons: CourseLesson[];


   @OneToMany(() => CourseReview, (review) => review.course)
reviews: CourseReview[];
}