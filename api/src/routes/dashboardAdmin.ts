import express from "express";
import { verifyTokenAndGetUser } from '../utils/tokenUtils';
import { DashboardData } from './get/dashboardData';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    console.log("token:", token);

    if (!token) {
        res.status(400).json({ error: "Bad request: token might be passed" });
        return;
    }

    const userId = await verifyTokenAndGetUser(token);

    if (!userId) { 
        res.status(404).json({ error: "User not found" });
        return;
    }

    const data = DashboardData(userId);

    console.log('data:', data);

});

export default router;
