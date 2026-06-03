import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: String, required: true }],
    weeklyGoalMinutes: { type: Number, required: true },
    createdAt: { type: Date, required: true },
  },
  { collection: 'teams' },
);

export const Team = model('Team', teamSchema);
