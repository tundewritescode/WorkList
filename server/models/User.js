import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  avatar: { type: String, default: 'user.png' },
  email: String,
  password: String,
  shortId: String,
  socialAuth: { type: Boolean, default: false }
});

/**
 * Hashes the password before saving to database
 */
userSchema.pre('save', async function hashPassword(next) {
  if (this.socialAuth) {
    this.password = null;
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

export default mongoose.model('User', userSchema);
