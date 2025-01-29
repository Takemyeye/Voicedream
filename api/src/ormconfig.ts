import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { Stories } from './entities/stories';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',
  synchronize: true,
  logging: true,
  entities: [User, Stories], 
  migrations: [],   
  subscribers: [],  
});
