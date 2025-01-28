import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';
import dotenv from 'dotenv';

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      email: string;
      avatar: string;
      provider: string;
      token: string;
    }
  }
}

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3001/api/auth/google/callback',
    },
    async (accessToken: string, refreshToken: string, profile, done) => {
      try {
        const { sub: id, name, email, picture } = profile._json || {};

        
        const user = new User();
        const randomId = Math.floor(10000 + Math.random() * 90000);
        user.id = randomId;
        user.username = name || '';
        user.email = email || '';
        user.avatar = picture || '';
        user.provider = 'google';
        user.token = accessToken;

        const userRepository = AppDataSource.getRepository(User);

        let existingUser = await userRepository.findOne({
          where: { id: user.id },
        });

        if (!existingUser) {
          existingUser = await userRepository.save(user);
        }

        done(null, existingUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});
