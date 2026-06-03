import express, { ErrorRequestHandler } from 'express';
import { apiBaseUrl, apiPort } from './config/api';
import { connectDatabase } from './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'octofit-backend', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('MongoDB connected');

    app.listen(apiPort, () => {
      console.log(`Backend API running on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
};

void start();
