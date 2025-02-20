import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { autorisation } from './autorisation';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ error: "Missing credentials" });
      return;
    }
  
    const provider = "VoiceDream";
  
    try {
      const user = await autorisation(email, provider, password, username);
  
      if (user) {
        res.status(201).json({ message: "User created successfully" });
      } else {
        res.status(500).json({ error: "User registration failed" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  };
  
  export const signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({ error: "Missing credentials" });
      return;
    }
  
    const provider = "VoiceDream";
  
    try {
      const user = await autorisation(email, provider, password);
  
      if (user) {
        const token = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET || '1256YHDFNSDK32',
          { expiresIn: '7d' }
        );
  
        res.json({ token });
      } else {
        res.status(404).json({ error: "User not found or wrong password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  };
  