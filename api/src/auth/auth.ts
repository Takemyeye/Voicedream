import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { signin } from './controllers/signin';
import { signup } from './controllers/signup';

const router = Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
    if (user) {
      const token = jwt.sign(
        { userId: user.userId, email: user.email, provider: user.provider },
        process.env.JWT_SECRET || '',
        { expiresIn: '7d' }
      );

      res.redirect(`cp.voicedream.space?token=${token}`);
    } else {
      res.status(500).json({ error: 'User not found' });
    }
  }
);

// Sign in route
router.post('/signin', signin);

// Sign up route
//router.post('/signup', signup);

export default router;
