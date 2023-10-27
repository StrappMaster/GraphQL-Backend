import mongoose from 'mongoose';
import { tagController } from './TagController';

const TagSchema = new mongoose.Schema({
    type: String,
    filter: {
      title: String,
      photo: String
    },
    isDeleted: Boolean
}, {
  timestamps: true
});

const init = async () => {
    const TagModel = mongoose.model('filters', TagSchema);
    tagController.setModel(TagModel);
}

export default init;

