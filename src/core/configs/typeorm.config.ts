import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2088', // PostgreSQL paroling
  database: 'dars605',
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
};