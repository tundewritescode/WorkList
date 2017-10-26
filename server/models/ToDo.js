import mongoose from 'mongoose';

const { Schema } = mongoose;

const toDoSchema = new Schema({
  ownerId: String,
  title: String,
});

export default mongoose.model('ToDo', toDoSchema);
