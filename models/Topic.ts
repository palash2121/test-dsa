import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a topic name'],
    unique: true,
  },
}, { timestamps: true });

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
