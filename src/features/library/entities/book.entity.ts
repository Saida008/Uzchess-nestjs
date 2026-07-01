// import { BaseModel } from '@core/configs/base.model';
// import { Column, Entity, ManyToOne } from 'typeorm';

// import { Author } from './author.entity';
// import { Category } from './category.entity';
// import { Difficulty } from './difficulty.entity';

// @Entity('books')
// export class Book extends BaseModel {
//   @Column({ length: 128 })
//   title: string;

//   @ManyToOne(() => Author)
//   author: Author;

//   @ManyToOne(() => Category)
//   category: Category;

//   @ManyToOne(() => Difficulty)
//   difficulty: Difficulty;
// }
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}