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
// export class LibraryModule {}
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { Category } from './entities/category.entity';
import { Difficulty } from './entities/difficulty.entity';

import { BookController } from './controllers/book.controller';

// Command handlers
import { CreateBookHandler } from './book/commands/create-book/create-book.handler';
import { DeleteBookHandler } from './book/commands/delete-book/delete-book.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Book,
      Author,
      Category,
      Difficulty,
    ]),
  ],
  controllers: [BookController],
  providers: [
    CreateBookHandler,
    DeleteBookHandler,
  ],
})
export class LibraryModule {}