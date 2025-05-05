import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log('mongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
