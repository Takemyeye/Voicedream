import { DataSource } from 'typeorm';
import { UserStory } from './entities/userStory';
import { Stories } from './entities/stories';
import { Voice } from './entities/voice';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'dev',
  password: process.env.DB_PASSWORD || '12345678987654321',
  database: process.env.DB_NAME || 'VoiceDream',
  synchronize: false,
  logging: true,
  entities: [User, Stories, Voice, UserStory],
  migrations: [],
  subscribers: [],
});
