import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    activityId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { collection: 'activities' },
);

export const Activity = model('Activity', activitySchema);
