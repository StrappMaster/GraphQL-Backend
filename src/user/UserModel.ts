import mongoose from 'mongoose';
import { userController } from './UserController';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    username: {
        type: String,
        // unique: true,
        // required: true,
        lowercase: true,
        minLength: 4,
        maxLength: 20,
    },
    photo: {
        type: String,
    },
    university: {
        name: {
        type: String,
        },
        domain: {
        type: String
        }
    },
    gradelevel: {
        type: String,
        default:"none"
    },
    major: {
        type: String,
        default:"none"
    },
    verification: {
        isVerified: {
        type: Boolean,
        default: false
        },
        status: {
        type: String,
        enum: ['VERIFIED_STUDENT', 'UNIVERSITY_FACULTY', 'UNVERIFIED_ID'],
        default: 'UNVERIFIED_ID'
        }
    },
    block: {
        status: {
        type: String,
        enum: ['NOT_BLOCKED', 'TOTAL_BLOCKED', 'WRITE_BLOCKED', 'UNVERIFIED'],
        default: 'UNVERIFIED'
        },
        deniedRoutes: {
        type: Array,
        path: String,
        method: {
            type: String,
            enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', '*']
        },
        }
    },
    savedposts: [mongoose.Schema.Types.ObjectId],
    isDeleted: {
        type: Boolean,
        default: false
    },
    confirmation: {
        code: {
        type: String
        },
        expire: {
        type: Date,
        }
    },
    Clout_Points: {
        postlikes_received: Number,
        commentlikes_received: Number,
        comments_received: Number
    },
    clout_points: {
    },
    resettoken: {
        type: String,
        default:null
    },
    reports: {
        'abuse': [mongoose.Schema.Types.ObjectId],
        'recism': [mongoose.Schema.Types.ObjectId],
        'cheating': [mongoose.Schema.Types.ObjectId],
        'bad language': [mongoose.Schema.Types.ObjectId],
        'spam': [mongoose.Schema.Types.ObjectId],
        'fruad': [mongoose.Schema.Types.ObjectId],
        'illegal activity': [mongoose.Schema.Types.ObjectId],
        'other': [mongoose.Schema.Types.ObjectId],
    },
    notification: {
        state: {
        type: Boolean,
        default: true
        },
        lastSeen: Date
    },
    tokens: [{
        authToken: String,
        firebaseToken: String,
    }],
    }, {
    timestamps: true
});

UserSchema.virtual('clout_points.postlikes_received').get(function (this: any) {
    return this.Clout_Points.postlikes_received ?? 0;
});

UserSchema.virtual('clout_points.commentlikes_received').get(function (this: any) {
    return this.Clout_Points.commentlikes_received ?? 0;
});

UserSchema.virtual('clout_points.comments_received').get(function (this: any) {
    return this.Clout_Points.comments_received ?? 0;
});

const init = async () => {
    const UserModel = mongoose.model('students', UserSchema);
    userController.setModel(UserModel);
}

export default init;

