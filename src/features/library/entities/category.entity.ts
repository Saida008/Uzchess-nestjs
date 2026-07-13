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
import { BaseModel } from '@core/configs/base.model';
import { Column, Entity } from 'typeorm';

@Entity('categories')
export class Category extends BaseModel {
  @Column({ length: 64, unique: true })
  title: string;
}