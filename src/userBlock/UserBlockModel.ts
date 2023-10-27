import mongoose from 'mongoose';
import { userBlockController } from './UserBlockController';

const UserBlockSchema = new mongoose.Schema({
    blockerUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    blockedUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }}, {
    timestamps: true
});

const init = async () => {
    const UserBlockModel = mongoose.model('blockstudents', UserBlockSchema);
    userBlockController.setModel(UserBlockModel);
}

export default init;

