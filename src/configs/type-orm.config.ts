import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: true,
  autoLoadEntities: true,
  entities: ['./dist/**/*.entity.js'],
};
