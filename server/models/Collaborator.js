import mongoose from 'mongoose';

const { Schema } = mongoose;

const collaboratorSchema = new Schema({
  toDoId: String,
  collaboratorId: String,
  readOnly: { type: Boolean, default: true }
});

export default mongoose.model('Collaborator', collaboratorSchema);
