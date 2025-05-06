import express from 'express';
import connectDB from './lib/connectDB.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import webHookRouter from './routes/webhook.route.js';
import { clerkMiddleware } from '@clerk/express';
const app = express();
app.use(clerkMiddleware());
app.use('/webhooks', webHookRouter);
app.use(express.json());
const port = 3000;

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || 'SOmething wnet wrong',
    status: error.status,
    stack: error.stack,
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`Blog app listening on port ${port}!`);
});
