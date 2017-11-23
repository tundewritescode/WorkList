import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Task Schema
 */
const taskSchema = new Schema({
  toDoId: String,
  title: String,
  priority: String,
  assignedTo: String,
  reminder: { type: Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  dueDate: Date,
});

export default mongoose.model('Task', taskSchema);
