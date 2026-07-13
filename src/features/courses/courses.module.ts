import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { Course } from './entities/course.entity';
import { CourseCategory } from './entities/course-category.entity';
import { CourseReview } from "./entities/course-review.entity";
import { CourseController } from './controllers/course.controller';
import { CreateCourseHandler } from './commands/create-course/create-course.handler';
import { GetCourseByIdHandler } from './queries/get-course-by-id/get-course-by-id.handler';
import { GetAllCoursesHandler } from './queries/get-all-courses/get-all-courses.handler';
import { UpdateCourseHandler } from './commands/update-course/update-course.handler';
import { DeleteCourseHandler } from './commands/delete-course/delete-course.handler';
import { CreateCourseCategoryHandler } from '../library/category/commands/create-category/create-course-category/create-course-category.handler';
import { GetAllCourseCategoriesHandler } from './queries/get-all-course-categories/get-all-course-categories.handler';
import { UpdateCourseCategoryHandler } from './commands/update-course-category/update-course-category.handler';
import { DeleteCourseCategoryHandler } from './commands/delete-course-category/delete-course-category.handler';
import { CourseCategoryController } from './controllers/course-category.controller';
import { CourseLesson } from './entities/course-lesson.entity';
import { CreateCourseLessonHandler } from './commands/create-course-lesson/create-course-lesson.handler';
import { CourseLessonController } from './controllers/course-lesson.controller';
import { UpdateCourseLessonHandler } from './commands/update-course-lesson/update-course-lesson.handler';
import { DeleteCourseLessonHandler } from './commands/delete-course-lesson/delete-course-lesson.handler';
import { GetAllCourseLessonsHandler } from './queries/get-all-course-lessons/get-all-course-lessons.handler';
import { GetCourseLessonByIdHandler } from './queries/get-course-lesson-by-id/get-course-lesson-by-id.handler';
import { CreateCourseReviewHandler } from './commands/create-course/create-course-review/create-course-review.handler';
import { CourseReviewController } from './controllers/course-review.controller';
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Course,
      CourseCategory,
      CourseLesson,
      CourseReview,
    ]),
  ],
  controllers: [
    CourseController,
    CourseCategoryController,
    CourseLessonController,
    CourseReviewController,
  ],
  providers: [
    CreateCourseHandler,
    GetCourseByIdHandler,
    GetAllCoursesHandler,
    UpdateCourseHandler,
    DeleteCourseHandler,
    CreateCourseCategoryHandler,
    GetAllCourseCategoriesHandler,
    UpdateCourseCategoryHandler,
    DeleteCourseCategoryHandler,
    CreateCourseLessonHandler,
    UpdateCourseLessonHandler,
    DeleteCourseLessonHandler,
    GetAllCourseLessonsHandler,
    GetCourseLessonByIdHandler,
    CreateCourseReviewHandler,
  ],
})
export class CoursesModule {}