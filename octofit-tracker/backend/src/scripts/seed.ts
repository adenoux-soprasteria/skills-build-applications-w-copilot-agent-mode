import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const users = [
  {
    userId: 'user-1',
    name: 'Mona Octocat',
    email: 'mona@example.com',
    age: 32,
    location: 'San Francisco, CA',
    fitnessGoal: 'Improve 10K pace',
    joinedAt: new Date('2026-01-08'),
  },
  {
    userId: 'user-2',
    name: 'Diego Rivera',
    email: 'diego@example.com',
    age: 28,
    location: 'Austin, TX',
    fitnessGoal: 'Build strength and consistency',
    joinedAt: new Date('2026-02-14'),
  },
  {
    userId: 'user-3',
    name: 'Priya Shah',
    email: 'priya@example.com',
    age: 41,
    location: 'Seattle, WA',
    fitnessGoal: 'Increase weekly activity minutes',
    joinedAt: new Date('2026-03-03'),
  },
];

const teams = [
  {
    teamId: 'team-1',
    name: 'OctoFit Core',
    description: 'Cross-training teammates focused on balanced weekly progress.',
    members: ['user-1', 'user-2'],
    weeklyGoalMinutes: 420,
    createdAt: new Date('2026-02-01'),
  },
  {
    teamId: 'team-2',
    name: 'Trail Builders',
    description: 'Outdoor runners and hikers building endurance together.',
    members: ['user-3'],
    weeklyGoalMinutes: 360,
    createdAt: new Date('2026-03-10'),
  },
];

const activities = [
  {
    activityId: 'activity-1',
    userId: 'user-1',
    type: 'Run',
    durationMinutes: 38,
    distanceMiles: 4.2,
    caloriesBurned: 410,
    activityDate: new Date('2026-05-28T07:15:00Z'),
  },
  {
    activityId: 'activity-2',
    userId: 'user-2',
    type: 'Strength Training',
    durationMinutes: 52,
    distanceMiles: 0,
    caloriesBurned: 330,
    activityDate: new Date('2026-05-29T18:30:00Z'),
  },
  {
    activityId: 'activity-3',
    userId: 'user-3',
    type: 'Cycling',
    durationMinutes: 64,
    distanceMiles: 15.8,
    caloriesBurned: 620,
    activityDate: new Date('2026-05-30T12:00:00Z'),
  },
  {
    activityId: 'activity-4',
    userId: 'user-1',
    type: 'Yoga',
    durationMinutes: 30,
    distanceMiles: 0,
    caloriesBurned: 120,
    activityDate: new Date('2026-06-01T06:45:00Z'),
  },
];

const leaderboard = [
  {
    entryId: 'leaderboard-1',
    userId: 'user-3',
    name: 'Priya Shah',
    rank: 1,
    points: 1840,
    weeklyStreak: 9,
  },
  {
    entryId: 'leaderboard-2',
    userId: 'user-1',
    name: 'Mona Octocat',
    rank: 2,
    points: 1695,
    weeklyStreak: 7,
  },
  {
    entryId: 'leaderboard-3',
    userId: 'user-2',
    name: 'Diego Rivera',
    rank: 3,
    points: 1510,
    weeklyStreak: 5,
  },
];

const workouts = [
  {
    workoutId: 'workout-1',
    title: 'Starter Cardio Circuit',
    description: 'A short aerobic session for building daily movement momentum.',
    level: 'beginner',
    durationMinutes: 25,
    focusAreas: ['cardio', 'mobility'],
    exercises: [
      { name: 'Jumping Jacks', sets: 3, durationSeconds: 45 },
      { name: 'Bodyweight Squats', sets: 3, reps: 12 },
      { name: 'Fast Walk Cooldown', sets: 1, durationSeconds: 300 },
    ],
  },
  {
    workoutId: 'workout-2',
    title: 'Runner Strength Builder',
    description: 'Lower-body and core work tailored for recreational runners.',
    level: 'intermediate',
    durationMinutes: 40,
    focusAreas: ['strength', 'core', 'running'],
    exercises: [
      { name: 'Reverse Lunges', sets: 3, reps: 10 },
      { name: 'Glute Bridges', sets: 3, reps: 15 },
      { name: 'Plank', sets: 3, durationSeconds: 60 },
    ],
  },
  {
    workoutId: 'workout-3',
    title: 'Trail Endurance Session',
    description: 'A mixed hill and steady-state session for outdoor endurance.',
    level: 'advanced',
    durationMinutes: 55,
    focusAreas: ['endurance', 'hills', 'cardio'],
    exercises: [
      { name: 'Hill Repeats', sets: 6, durationSeconds: 90 },
      { name: 'Steady Jog', sets: 1, durationSeconds: 1200 },
      { name: 'Walking Recovery', sets: 1, durationSeconds: 300 },
    ],
  },
];

const seed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await User.insertMany(users);
  await Team.insertMany(teams);
  await Activity.insertMany(activities);
  await LeaderboardEntry.insertMany(leaderboard);
  await Workout.insertMany(workouts);

  console.log(`Seeded ${users.length} users`);
  console.log(`Seeded ${teams.length} teams`);
  console.log(`Seeded ${activities.length} activities`);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);
  console.log(`Seeded ${workouts.length} workouts`);
};

seed()
  .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
