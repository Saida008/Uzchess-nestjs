// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       ...typeOrmConfig,
//       autoLoadEntities: true,
//     }),
//     CqrsModule,
//     LibraryModule,
//     CommonModule,
//   ],
// })
// export class AppModule {}
import { Entity, Column } from 'typeorm';
import { BaseModel } from '@core/configs/base.model';

@Entity('categories')
export class Category extends BaseModel {
  @Column({ length: 64, unique: true })
  title?: string;
}