import { BaseModel } from '@core/configs/base.model';
import { Column, Entity } from 'typeorm';

@Entity('difficulties')
export class Difficulty extends BaseModel {
  @Column({ length: 64, unique: true })
  title: string;
}