import { DataSource } from 'typeorm';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',
  synchronize: true,
  logging: true,
  entities: [User], 
  migrations: [],   
  subscribers: [],  
});
