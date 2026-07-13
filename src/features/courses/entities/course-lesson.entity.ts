import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity("course_lessons")
export class CourseLesson {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 128 })
    title: string;

    @Column()
    video: string;

    @ManyToOne(() => Course, (course) => course.lessons, {
        onDelete: "CASCADE",
    })
    course: Course;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}