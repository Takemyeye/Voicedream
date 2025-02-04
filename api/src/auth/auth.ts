import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = req.user?.token;
    res.redirect(`http://localhost:3000?token=${token}`);
    console.log('Google Auth Response:', req.user);
  }
);

export default router;
