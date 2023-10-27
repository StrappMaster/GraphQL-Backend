import mongoose from 'mongoose';
import { universityController } from './UniversityController';

export const UniversitySchema = new mongoose.Schema({
  university: {
    domains: [{
      type: String,
    }],
    name: String,
    shortname: String,
    photo: String
  },
  color: {
    type: String,
    default: "#0356fc"
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  universitySpecificFeedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  collegeFeedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }},
  {
    timestamps: true
  }
);

const UniversityModel = mongoose.model('universities', UniversitySchema);

const init = async () => {
  universityController.setModel(UniversityModel);
}

export default init;

