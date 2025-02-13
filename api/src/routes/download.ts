import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";

const router = express.Router();
const userVoiceDir = path.join(__dirname, "../../upload");
if (!fs.existsSync(userVoiceDir)) {
  fs.mkdirSync(userVoiceDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, userVoiceDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

router.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  res.json({ message: "File uploaded successfully" });
});


export default router;
/* 
*/
