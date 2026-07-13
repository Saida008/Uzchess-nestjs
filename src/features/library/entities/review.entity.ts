import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '@core/configs/base.model';

import { User } from '@/features/auth/entities/user.entity';
import { Book } from './book.entity';

@Entity('reviews')
@Unique(['user', 'book'])
export class Review extends BaseModel {
  @Column()
  rating: number;

  @Column({ length: 512 })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;
}