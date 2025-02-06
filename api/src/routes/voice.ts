import express, { Request, Response } from "express";
import { saveVoice } from "../repositories/voiceRepository";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import { verifyTokenAndGetUser } from '../utils/tokenUtils';

dotenv.config();
const router = express.Router();
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVEN_LABS_VOICE_URL = "https://api.elevenlabs.io/v1/voices/add";

router.post("/voice", async (req: Request, res: Response) => {
    const { token, voiceName, audioData } = req.body;
    const userId = await verifyTokenAndGetUser(token);

    try {
        if (!audioData || !voiceName) {
            res.status(400).json({ error: "Audio or Voice file (Base64) is required" });
            return;
        }

        if (typeof audioData !== 'string') {
            res.status(400).json({ error: "Audio data must be a base64-encoded string" });
            return;
        }

        const audioBuffer = Buffer.from(audioData, "base64");

        const form = new FormData();
        form.append("name", voiceName);
        form.append("files", audioBuffer, { filename: "recording.mp3" });
        form.append("remove_background_noise", "false");
        form.append("description", "Custom AI Voice");

        const headers = {
            ...form.getHeaders(),
            "xi-api-key": ELEVENLABS_API_KEY,
        };

        const elevenLabsResponse = await axios.post(ELEVEN_LABS_VOICE_URL, form, { headers: headers });

        const elevenLabsData = elevenLabsResponse.data;
        const voiceId = elevenLabsData.voice_id;

        const userVoiceDir = path.join(__dirname, "../..", "userVoice");
        if (!fs.existsSync(userVoiceDir)) {
            fs.mkdirSync(userVoiceDir, { recursive: true });
        }

        const filePath = path.join(userVoiceDir, `${voiceId}.mp3`);
        fs.writeFileSync(filePath, audioBuffer);

        saveVoice(voiceName, voiceId, userId);
        res.json({ message: "Voice successfully registered", voiceId });
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({
            error: "Error registering voice",
            details: error.message || "Unknown error",
        });
    }
});

export default router;
