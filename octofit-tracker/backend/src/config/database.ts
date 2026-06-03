import mongoose from 'mongoose';

export const databaseName = 'octofit_db';
export const mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${databaseName}`;

export const connectDatabase = async (): Promise<typeof mongoose> => {
  return mongoose.connect(mongoUri);
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};
