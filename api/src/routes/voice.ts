import express from "express";
import { saveVoice } from "../repositories/voiceRepository";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import multer from "multer";
import { verifyTokenAndGetUser } from "../utils/tokenUtils";

dotenv.config();
const router = express.Router();
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVEN_LABS_VOICE_URL = "https://api.elevenlabs.io/v1/voices/add";

// PATH User Voice
const userVoiceDir = path.join(__dirname, "../../userVoice");
if (!fs.existsSync(userVoiceDir)) {
    fs.mkdirSync(userVoiceDir, { recursive: true });
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/voice", upload.single("audio"), async (req, res) => {
    const { token, voiceName } = req.body;
    const audioFile = req.file;

    const userId = await verifyTokenAndGetUser(token);
    if (!userId) {
        res.status(400).json({ error: "User not found" });
        return;
    }

    if (!voiceName || !audioFile) {
        res.status(400).json({ error: "Voice name and audio file are required" });
        return;
    }

    try {
        const form = new FormData();
        form.append("name", voiceName);
        form.append("files", audioFile.buffer, { filename: audioFile.originalname });
        form.append("remove_background_noise", "false");
        form.append("description", "Custom AI Voice");

        const headers = {
            ...form.getHeaders(),
            "xi-api-key": ELEVENLABS_API_KEY,
        };

        const elevenLabsResponse = await axios.post(ELEVEN_LABS_VOICE_URL, form, { headers });
        const elevenLabsData = elevenLabsResponse.data;

        console.log("elevenlabs data:" ,elevenLabsData);

        const newVoiceId = elevenLabsData.voice_id;

        const newFilePath = path.join(userVoiceDir, `${newVoiceId}.mp3`);
        fs.writeFileSync(newFilePath, audioFile.buffer);

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
