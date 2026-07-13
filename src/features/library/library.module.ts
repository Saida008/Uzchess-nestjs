// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CqrsModule } from '@nestjs/cqrs';

// import { Author } from './entities/author.entity';
// import { Category } from './entities/category.entity';
// import { Language } from '../common/entities/language.entity';
// import { Difficulty } from './entities/difficulty.entity';

// import { CategoryController } from './controllers/category.controller';
// import { LanguageController } from './controllers/language/language.controller';
// import { AuthorController } from './controllers/author.controller';
// import { DifficultyController } from './controllers/difficulty.controller';

// import { CreateCategoryHandler } from './category/commands/create-category/create-category.handler';
// import { UpdateCategoryHandler } from './category/commands/create-category/update-category/update-category.handler';

// import { CreateAuthorHandler } from './author/commands/create-author/create-author.handler';
// import { UpdateAuthorHandler } from './author/commands/update-author/update-author.handler';
// import { DeleteAuthorHandler } from './author/commands/delete-author/delete-author.handler';

// import { CreateDifficultyHandler } from './difficulty/commands/create-difficulty/create-difficulty.handler';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       Author,
//       Category,
//       Language,
//       Difficulty,
//     ]),
//     CqrsModule,
//   ],
//   controllers: [
//     CategoryController,
//     LanguageController,
//     AuthorController,
//     DifficultyController,
//   ],
//   providers: [
//     CreateCategoryHandler,
//     UpdateCategoryHandler,

//     CreateAuthorHandler,
//     UpdateAuthorHandler,
//     DeleteAuthorHandler,

//     CreateDifficultyHandler,
//   ],
// })
// export class LibraryModule {}import { Module } from '@nestjs/common';import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { Category } from './entities/category.entity';
import { Difficulty } from './entities/difficulty.entity';


import { BookController } from './controllers/book.controller';
import { DifficultyController } from './controllers/difficulty.controller';
import { CategoryController } from './controllers/category.controller';
import { AuthorController } from './controllers/author.controller';


import { CreateBookHandler } from './book/commands/create-book/create-book.handler';
import { UpdateBookHandler } from './book/commands/update-book/update-book.handler';
import { DeleteBookHandler } from './book/commands/delete-book/delete-book.handler';


import { CreateCategoryHandler } from './category/commands/create-category/create-category.handler';
import { UpdateCategoryHandler } from './category/commands/update-category/update-category.handler';
import { DeleteCategoryHandler } from './category/commands/delete-category/delete-category.handler';
import { GetAllCategoriesHandler } from './category/queries/get-all-categories/get-all-categories.handler';


import { CreateAuthorHandler } from './author/commands/create-author/create-author.handler';
import { UpdateAuthorHandler } from './author/commands/update-author/update-author.handler';
import { DeleteAuthorHandler } from './author/commands/delete-author/delete-author.handler';


import { CreateDifficultyHandler } from './difficulty/commands/create-difficulty/create-difficulty.handler';
import { UpdateDifficultyHandler } from './difficulty/commands/update-difficulty/update-difficulty.handler';
import { DeleteDifficultyHandler } from './difficulty/commands/delete-difficulty/delete-difficulty.handler';
import { Module } from '@nestjs/common';

import { Like } from './entities/like.entity';

import { CreateLikeHandler } from './like/commands/create-like/create-like.handler';
import { LikeController } from './controllers/like.controller';
import { User } from '../auth/entities/user.entity';
import { DeleteLikeHandler } from './like/commands/delete-like/delete-like.handler';

import { Review } from './entities/review.entity';
import { CreateReviewHandler } from './review/commands/create-review/create-review.handler';
import { ReviewController } from './controllers/review.controller';
import { DeleteReviewHandler } from './review/commands/delete-review/delete-review.handler';
import { UpdateReviewHandler } from './review/commands/update-review/update-review.handler';
import { GetBookReviewsHandler } from './review/queries/get-book-reviews/get-book-reviews.handler';
import { GetAllBooksHandler } from './book/queries/get-all-books/get-all-books.handler';
import { GetBookByIdHandler } from './book/queries/get-book-by-id/get-book-by-id.handler';
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Book,
      Author,
      Category,
      Difficulty,
      Like,
      Review,
      User,
    ]),
  ],

  controllers: [
    BookController,
    DifficultyController,
    CategoryController,
    AuthorController,
    LikeController,
    ReviewController,
  ],

  providers: [
    
    CreateBookHandler,
    UpdateBookHandler,
    DeleteBookHandler,
    UpdateReviewHandler,
    CreateCategoryHandler,
    UpdateCategoryHandler,
    DeleteCategoryHandler,
    GetAllCategoriesHandler,
    CreateLikeHandler,
    DeleteLikeHandler,
    CreateReviewHandler,
    DeleteReviewHandler,
    GetBookReviewsHandler,
    CreateAuthorHandler,
    UpdateAuthorHandler,
    DeleteAuthorHandler,

    CreateDifficultyHandler,
    UpdateDifficultyHandler,
    DeleteDifficultyHandler,

    GetAllBooksHandler,
    GetBookByIdHandler,
  ],
})
export class LibraryModule {}