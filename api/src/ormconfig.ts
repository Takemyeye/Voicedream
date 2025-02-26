import { DataSource } from 'typeorm';
import { UserStory } from './entities/userStory';
import { Stories } from './entities/stories';
import { Voice } from './entities/voice';
import { User } from './entities/user';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 0,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  synchronize: false,
  logging: false,
  entities: [User, Stories, Voice, UserStory],
  migrations: [],
  subscribers: [],
});
