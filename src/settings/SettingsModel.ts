import mongoose from 'mongoose';
import { settingsController } from './SettingsController';

const settingsSchema = new mongoose.Schema({
  cloutCommentsMultiplier: {
    type: Number
  }}
);

const init = async () => {
    const settingsModel = mongoose.model('settings', settingsSchema);
    settingsController.setModel(settingsModel);
}

export default init;

