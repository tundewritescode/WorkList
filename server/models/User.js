import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: String,
  password: String,
});

/**
 * Hashes the password before saving to database
 */
userSchema.pre('save', async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model('User', userSchema);
