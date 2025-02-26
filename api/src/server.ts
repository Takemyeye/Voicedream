  import { AppDataSource } from './ormconfig';
  import express from 'express';
  import dotenv from 'dotenv';
  import cors from 'cors';
  import session from 'express-session';
  import passport from 'passport';
  import path from 'path'
  import './auth/passportSetup';

  // Routes
  import getStoryRoutes from './repositories/default/default';
  import dashboardRoutes from './routes/dashboardAdmin';
  import getComponent from './routes/get/getComponent';
  import currentUser from './user/currentUser';
  import voiceRoutes from './routes/voice';
  import chatRoutes from './routes/chat';
  import authRoutes from './auth/auth';
  import ttsRoutes from './routes/tts';

  // salva db
  import writeData from './service/writeDataToDB';
  import audioRoutes from "./routes/download";
  import testTTS from './routes/ttsScript';

  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 3001;

app.use('/userStory', express.static(path.join(__dirname, 'userStory')));


  app.use(express.urlencoded({ extended: true }));

  const corsOptions = {
    origin: ['https://cp.voicedream.space', 'https://cp.voicedream.space'],
    methods: '*',
    allowedHeaders: '*',
    credentials: true
  };

  app.use(cors(corsOptions));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'excvgbnim',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.json({ limit: '50mb' }));

  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((error) => {
      console.error('Error during DataSource initialization', error);
    });

  app.get('/', (req, res) => {
    res.send('Server running');
  });

  app.use('/api', getStoryRoutes);
  app.use('/api', getComponent);
  app.use('/api', currentUser);
  app.use('/api', voiceRoutes);
  app.use('/api', chatRoutes);
  app.use('/api', authRoutes);
  app.use('/api', ttsRoutes);

  // admin
  app.use('/api', dashboardRoutes);

  // salva dati alla db
  app.use('/api', audioRoutes);
  app.use('/api', writeData);
  app.use('/api', testTTS);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
