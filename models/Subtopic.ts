import mongoose from 'mongoose';

const SubtopicSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a subtopic name'],
  },
  leetCodeLink: {
    type: String,
  },
  youtubeLink: {
    type: String,
  },
  articleLink: {
    type: String,
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy',
  },

}, { timestamps: true });

export default mongoose.models.Subtopic || mongoose.model('Subtopic', SubtopicSchema);
