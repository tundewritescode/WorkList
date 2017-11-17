import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import generator from 'generate-password';

const { Schema } = mongoose;

/**
 * User Schema
 */
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String, default: 'user.png' },
  email: { type: String },
  password: {
    type: String,
    default: generator.generate({
      length: 10,
      numbers: true
    })
  },
  shortId: String,
  socialAuth: { type: Boolean, default: false }
});

/**
 * Hashes the password before saving to database
 */
userSchema.pre('save', async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);
