import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  toDoId: String,
  title: String,
  priority: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  dueAt: Date,
});

export default mongoose.model('Task', taskSchema);
