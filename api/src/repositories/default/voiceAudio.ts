import express, { Response, Request } from "express";
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();

const router = express.Router();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

router.get('/getvoice/audio/:fileId', async (req: Request, res: Response) => {
    const { fileId } = req.params;

    const response = await axios.get(`https://api.elevenlabs.io/v1/voices/${fileId}`, {
        headers: {
            "xi-api-key": ELEVENLABS_API_KEY
        }
    });
    
    if(!response) {
        res.status(404).json({ error: "Voice File not found" });
        return;
    }
    console.log("response preview url data:", response.data.preview_url);
    console.log("data:", response);

    res.json( response.data.preview_url );
});

export default router;