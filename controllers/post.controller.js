import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json({ message: 'Not Authenticated' });
  }
  const user = await User.findOne({ clerkId: clerkUserId });

  const newPost = new Post({ user: user._id, ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  console.log(req.auth);

  if (!clerkUserId) {
    return res.status(401).json({ message: 'Not Authenticated' });
  }
  const user = await User.findOne({ clerkId: clerkUserId });
  const post = await Post.findOne({ _id: req.params.id });
  if (post.user != user._id) {
    return res.status(403).json({ message: 'Not Authorized' });
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json('post deleted successfully');
};

export const updatePost = async (req, res) => {
  const newPost = new Post(req.body);
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json(post);
};
