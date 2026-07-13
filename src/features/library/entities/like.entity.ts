import { Entity, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '@core/configs/base.model';

import { User } from '@/features/auth/entities/user.entity';
import { Book } from './book.entity';

@Entity('likes')
@Unique(['user', 'book'])
export class Like extends BaseModel {
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Book, (book) => book.likes)
  book: Book;
}