import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('all users');
});

export default router;
