import { userBlockController } from './UserBlockController';

const UserBlockDomain = {
    resolvers: {
        Query: {
            getUserBlocks: userBlockController.getUserBlocks,
        }
    },
};


export default UserBlockDomain;
