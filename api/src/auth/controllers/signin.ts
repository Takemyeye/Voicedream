import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from './authenticate';

const JWT = process.env.JWT_SECRET

export const signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Missing credentials" });
        return;
    }

    const provider = "VoiceDream";

    try {
        const user = await authenticate(email, provider, password);

        console.log(user);
        if (user) {
            const token = jwt.sign(
                { userId: user },
                 JWT|| '',
                { expiresIn: '1d' }
            );

            res.json({ token });
        } else {
            res.status(404).json({ error: "User not found or wrong password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};
