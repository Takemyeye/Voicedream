import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { User } from '../../entities/user';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Missing credentials" });
        return;
    }

    const provider = "VoiceDream";

    try {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOne({ where: { email, provider } });

        if (user) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        user = new User();
        user.username = username || '';
        user.email = email;
        user.avatar = '';
        user.provider = provider;
        user.password = password;

        await userRepository.save(user);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};
