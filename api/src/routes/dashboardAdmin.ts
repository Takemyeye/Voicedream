import express from "express";
import { verifyTokenAndGetUser } from '../utils/tokenUtils';
import { DashboardData } from './get/dashboardData';
import dotenv from 'dotenv';

dotenv.config();

const admin = process.env.ADMIN_ID;

const router = express.Router();

router.get('/dashboard', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(400).json({ error: "Bad request: token might be passed" });
        return;
    }

    const userId = await verifyTokenAndGetUser(token);

    if (!userId) { 
        res.status(404).json({ error: "User not found" });
        return;
    } else if (userId != admin) { 
        res.status(403).json({ error: "Forbidden Date" });
        return;
    }

    try {
        const data = await DashboardData(userId);

        res.status(200).json({
            users: data.users,
            stories: data.stories,
            voices: data.voices,
            usersStories: data.usersStories
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
