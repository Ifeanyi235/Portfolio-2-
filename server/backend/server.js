import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import driveRoutes from './routes/driveRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const origins = (process.env.CLIENT_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean);
app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(cors({ origin: origins.length ? origins : false }));
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://portfolio-2-s3db.vercel.app", // your deployed frontend
  ],
}));
app.use(express.json({ limit: '32kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/folders', driveRoutes);
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => console.log(`Drive API listening on port ${port}`));
