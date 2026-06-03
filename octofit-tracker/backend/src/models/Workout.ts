import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: false },
    reps: { type: Number, required: false },
    durationSeconds: { type: Number, required: false },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    workoutId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusAreas: [{ type: String, required: true }],
    exercises: [exerciseSchema],
  },
  { collection: 'workouts' },
);

export const Workout = model('Workout', workoutSchema);
