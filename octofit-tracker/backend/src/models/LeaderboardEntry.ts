import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    entryId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    weeklyStreak: { type: Number, required: true },
  },
  { collection: 'leaderboard' },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
