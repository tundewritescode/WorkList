import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Collaborator schema
 */
const collaboratorSchema = new Schema({
  toDoId: { type: Schema.Types.ObjectId, ref: 'ToDo' },
  collaboratorId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Collaborator', collaboratorSchema);
