import mongoose from 'mongoose';

const { Schema } = mongoose;

const collaboratorSchema = new Schema({
  toDoId: String,
  userId: String,
  readOnly: { type: Boolean, default: true }
});

export default mongoose.model('ToDo', collaboratorSchema);
