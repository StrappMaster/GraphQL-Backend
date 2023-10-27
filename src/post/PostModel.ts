import mongoose from 'mongoose';
import { postController } from './PostController';

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photos: [String],
    likes: [mongoose.Schema.Types.ObjectId],
    fake_likes: {
        type: Number,
        default: 0,
    },
    dislikes: [mongoose.Schema.Types.ObjectId],
    isRestricted: {
        type: Boolean,
        default: true,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    reports: {
        abuse: [mongoose.Schema.Types.ObjectId],
        recism: [mongoose.Schema.Types.ObjectId],
        cheating: [mongoose.Schema.Types.ObjectId],
        'bad language': [mongoose.Schema.Types.ObjectId],
        spam: [mongoose.Schema.Types.ObjectId],
        fruad: [mongoose.Schema.Types.ObjectId],
        'illegal activity': [mongoose.Schema.Types.ObjectId],
        other: [mongoose.Schema.Types.ObjectId],
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    FakeCommentCreatedAt: {
        type: Date,
    },
},
{
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});

CommentSchema.virtual('postedAt').get(function (this: any) {
    return ((this.FakeCommentCreatedAt && this.FakeCommentCreatedAt > this.createdAt)
            ? this.FakeCommentCreatedAt
            : this.createdAt).getTime() ?? 0;
});

const PostSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
    },
    filter_typeId: mongoose.Schema.Types.ObjectId,
    content: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        photos: [String],
    },
    likes: [mongoose.Schema.Types.ObjectId],
    fake_likes: {
        type: Number,
        default: 0,
    },
    FakePostCreatedAt: {
        type: Date,
    },
    dislikes: [mongoose.Schema.Types.ObjectId],
    isRestricted: {
        type: Boolean,
        default: true,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isPin: {
        type: Boolean,
        default: false,
    },
    isNotified: {
        type: Boolean,
        default: false,
    },
    isPinCreatedAt: {
        type: Date,
        default: 0,
    },
    isPinUpdatedAt: {
        type: Date,
        default: 0,
    },
    reports: {
        abuse: [mongoose.Schema.Types.ObjectId],
        recism: [mongoose.Schema.Types.ObjectId],
        cheating: [mongoose.Schema.Types.ObjectId],
        'bad language': [mongoose.Schema.Types.ObjectId],
        spam: [mongoose.Schema.Types.ObjectId],
        fruad: [mongoose.Schema.Types.ObjectId],
        'illegal activity': [mongoose.Schema.Types.ObjectId],
        other: [mongoose.Schema.Types.ObjectId],
    },
    topics: [{
        type: String,
    }],
    comments: [CommentSchema],
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});

PostSchema.virtual('postedAt').get(function (this: any) {
    return ((this.FakePostCreatedAt > this.createdAt)
            ? this.FakePostCreatedAt
            : this.createdAt).getTime() ?? 0;
});


const init = async () => {
    const PostModel = mongoose.model('posts', PostSchema);
    postController.setModel(PostModel);
};

export default init;
