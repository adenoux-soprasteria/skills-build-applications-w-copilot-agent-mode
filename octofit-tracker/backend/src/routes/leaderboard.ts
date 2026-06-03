import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json([
    {
      rank: 1,
      userId: 'user-1',
      name: 'Mona Octocat',
      points: 1240,
    },
  ]);
});

export default router;
