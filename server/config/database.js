import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Replaces deprecated Mongoose Promise with Node's global Promise
 */
mongoose.Promise = global.Promise;

/**
 * Creates a MongoDB connection
 */
export default mongoose.connect(
  process.env.MONGO_URL,
  { useMongoClient: true }
);
