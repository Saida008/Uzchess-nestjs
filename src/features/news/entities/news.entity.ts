import { BaseModel } from '@core/configs/base.model';
import { Column, Entity } from 'typeorm';

@Entity('news')
export class News extends BaseModel {
  @Column({ length: 128 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 256 })
  image: string;
}