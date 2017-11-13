import mongoose from 'mongoose';

const { Schema } = mongoose;

const collaboratorSchema = new Schema({
  toDoId: String,
  collaboratorId: String,
});

export default mongoose.model('Collaborator', collaboratorSchema);
