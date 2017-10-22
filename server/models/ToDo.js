import mongoose from 'mongoose';

const { Schema } = mongoose;

const toDoSchema = new Schema({
  title: String,
  description: String,
  tasks: [
    {
      title: String,
      description: String,
      priority: String,
      completed: Boolean,
      createdAt: Date.now,
      dueAt: Date,
    }
  ],
  readOnly: Boolean,
});

export default mongoose.model('ToDo', toDoSchema);
