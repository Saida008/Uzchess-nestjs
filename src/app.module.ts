import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { LibraryModule } from './features/library/library.module';
import { CommonModule } from '@features/common/common.module';
import { typeOrmConfig } from '@core/configs/typeorm.config';
import { AuthModule } from './features/auth/user/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { PermissionGuard } from './core/guards/permission.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { NewsModule } from './features/news/news.module';
import { CoursesModule } from './features/courses/courses.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ForTheLoveOfGodDontUseInProduction',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
    }),
    CqrsModule.forRoot(),
    CacheModule.register({
      ttl:1000*60*30
    }),
    LibraryModule,
    CommonModule,
    AuthModule,
    NewsModule,
    CoursesModule,
  ],
  providers:[
    {provide:APP_GUARD, useClass:AuthGuard},
    // {provide:APP_GUARD, useClass:PermissionGuard},
  ]
})
export class AppModule {}