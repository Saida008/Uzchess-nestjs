import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { LibraryModule } from './features/library/library.module';
import { CommonModule } from '@features/common/common.module';
import { typeOrmConfig } from '@core/configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
    }),
    CqrsModule.forRoot(),
    LibraryModule,
    CommonModule,
  ],
})
export class AppModule {}