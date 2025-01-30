import { DataSource } from 'typeorm';
import { UserStory } from './entities/userStory';
import { Stories } from './entities/stories';
import { Voice } from './entities/voice';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',
  synchronize: true,
  logging: true,
  entities: [User, Stories, Voice, UserStory], 
  migrations: [],   
  subscribers: [],  
});
