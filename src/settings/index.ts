import { settingsController } from './SettingsController';

const SettingsDomain = {
    resolvers: {
        Query: {
            getSettings: settingsController.getSettings,
        }
    },
};


export default SettingsDomain;
