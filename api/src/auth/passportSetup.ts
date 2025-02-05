import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreateUser } from './authUtils';
import { AppDataSource } from '../ormconfig';
import { User } from '../entities/user';
import passport from 'passport';
import dotenv from 'dotenv';

declare global {
  namespace Express {
    interface User {
      userId: string;
      username: string;
      email: string;
      credit: number;
      avatar: string;
      provider: string;
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
        const { name, email, picture } = profile._json || {};

        if (!email) {
          return done(new Error('Email not provided by Google'));
        }

        let user = await findOrCreateUser(email, 'google', {
          username: name,
          avatar: picture,
        });

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});
