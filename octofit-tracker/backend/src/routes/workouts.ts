import { Router } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ level: 1, title: 1 }).lean();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default router;
