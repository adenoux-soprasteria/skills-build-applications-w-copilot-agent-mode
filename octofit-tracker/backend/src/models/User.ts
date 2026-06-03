import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { collection: 'users' },
);

export const User = model('User', userSchema);
