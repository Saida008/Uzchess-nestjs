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
import { Entity, Column, ManyToOne , OneToMany} from 'typeorm';
import { BaseModel } from '@core/configs/base.model';
import { Like } from './like.entity';
import { Author } from './author.entity';
import { Category } from './category.entity';
import { Difficulty } from './difficulty.entity';
import { Review } from './review.entity';

@Entity('books')
export class Book extends BaseModel {
  @Column({ length: 128 })
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => Difficulty)
  difficulty: Difficulty;

  @OneToMany(() => Like, (like) => like.book)
  likes: Like[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

}