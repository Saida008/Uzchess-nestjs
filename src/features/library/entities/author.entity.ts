import { BaseModel } from '@core/configs/base.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


import { Book } from './book.entity';

@Entity('authors')
export class Author extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  fullName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}