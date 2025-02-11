import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
    if (user) {
      const token = jwt.sign(
        { userId: user.userId, email: user.email, provider: user.provider },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '7d' }
      );

      res.redirect(`http://localhost:3000?token=${token}`);
    } else {
      res.status(500).json({ error: 'User not found' });
    }
  }
);

export default router;
