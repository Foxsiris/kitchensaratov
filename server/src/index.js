import express from 'express';
import authRoutes from './routes/auth.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '2mb' }));

app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on :${port}`);
});
