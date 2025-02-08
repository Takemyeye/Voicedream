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
    const { token, voiceName, voiceId } = req.body;

    const userId = await verifyTokenAndGetUser(token);
    
    if(!userId) {
      res.status(400).json({ error: "User not found" })
      return;
    }
    
    if (!voiceId || !voiceName) {
        res.status(400).json({ error: "VoiceId and VoiceName are required" });
        return;
    }
    
    const userVoiceDir = path.join(__dirname, "../..", "voices");
    const voiceFilePath = path.join(userVoiceDir, `${voiceId}.mp3`);
    
    console.log("Voice file path:", voiceFilePath);
    
    if (!fs.existsSync(voiceFilePath)) {
        res.status(404).json({ error: "Voice file not found" });
        return;
    }
    
    try {
        const audioBuffer = fs.readFileSync(voiceFilePath);
        console.log("Audio buffer size:", audioBuffer.length);

        const form = new FormData();
        form.append("name", voiceName);
        form.append("files", audioBuffer, { filename: `${voiceId}.mp3` });
        form.append("remove_background_noise", "false");
        form.append("description", "Custom AI Voice");

        const headers = {
            ...form.getHeaders(),
            "xi-api-key": ELEVENLABS_API_KEY,
        };

        const elevenLabsResponse = await axios.post(ELEVEN_LABS_VOICE_URL, form, {
            headers: headers,
        });

        console.log("Eleven Labs response:", elevenLabsResponse.data);

        const elevenLabsData = elevenLabsResponse.data;
        const newVoiceId = elevenLabsData.voice_id;

        saveVoice(voiceName, newVoiceId, userId);

        res.json({ message: "Voice successfully registered", voiceId: newVoiceId });
    } catch (error: any) {
        console.error("Error:", error.message);
        console.error("Error response:", error.response?.data);

        res.status(500).json({
            error: "Error registering voice",
            details: error.message || "Unknown error",
        });
    }
});

export default router;
