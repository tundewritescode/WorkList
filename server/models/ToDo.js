import mongoose from 'mongoose';

const { Schema } = mongoose;

const toDoSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
});

export default mongoose.model('ToDo', toDoSchema);
