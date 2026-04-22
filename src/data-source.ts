import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  entities: ['./dist/**/*.entities.(t|j)s'],
  migrations: ['./dist/migration/*.(t|j)s'],
});

export default AppDataSource;
