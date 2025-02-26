import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../../ormconfig';
import { User } from '../../entities/user';

const JWT = process.env.JWT_SECRET;

export const signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Missing credentials" });
        return;
    }

    const provider = "VoiceDream";

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email, provider } });

        if(!user?.password) {
            res.status(404).json({ error: "User not found" })
            return;
        }
        console.log("user: from signIn", user)

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            console.log("passwordMatch: from signIn", passwordMatch)

            console.log("user.userId: sign in", user.userId);

            if (passwordMatch) {
                const token = jwt.sign(
                    { userId: user.userId },
                    JWT || '',
                    { expiresIn: '1d' }
                );

                res.json({ token });
            } else {
                res.status(404).json({ error: "Wrong password" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};
