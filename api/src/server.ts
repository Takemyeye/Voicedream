import { AppDataSource } from './ormconfig';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import authRoutes from './auth/auth';
import chatRoutes from './routes/chat';
import './auth/passportSetup';

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: '*',
  allowedHeaders: '*',
};

app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

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

app.use('/api/chat', chatRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
