import mongoose from 'mongoose';
import { feedController } from './FeedController';

export const FeedSchema = new mongoose.Schema({
  course: {
    name: {
      type: String,
      required: true,
      uppercase: true
    },
  },
  group: {
    name: {
      type: String,
      // required: true,
      uppercase: true,
      default: null
    },
    description: {
      type: String,
      // required: true,
      default: null
    },
  },
  section: {
    name: {
      type: String,
      default: 'all sections',
      // lowercase: true
    },
    number: {
      type: String,
      default: 'N/A',
      lowercase: true
    },
    category: {
      type: String,
      default: 'none',
      enum: ['none', 'lecture', 'discussion', 'lab', 'tutorial', 'practical', 'seminar']
    }
  },
  photo: {
    type: String,
    default: 'empty',
  },
  memberCount: {
    type: Number,
    default: 0
  },
  university: {
    name: {
      type: String,
      required: true,
    },
    domains: [{
      type: String
    }]
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isGeneral: {
    type: Boolean,
    default: false
  },
  topics: {
    type: Array,
    default: ['general', 'notes', 'homework']
  },
  grouptype: {
    type: String,
    default: 'classgroup'
  },
  campusgroupId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
}, {
  timestamps: true
});

export const FeedFollowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }}, {
    timestamps: true
  }
);

const FeedModel = mongoose.model('sections', FeedSchema);
const FeedFollowModel = mongoose.model('userseengroups', FeedFollowSchema);

const init = async () => {
  feedController.setModel(FeedModel);
  feedController.setFeedFollowModel(FeedFollowModel);
}

export default init;

