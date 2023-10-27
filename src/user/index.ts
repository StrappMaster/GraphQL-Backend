import { userController } from './UserController';

const UserDomain = {
    resolvers: {
        Query: {
            getUsers: userController.getUsers,
        },
        Post: {
            getUsers: userController.getUserFromPost,
            getAuthor: userController.getUserFromIdField,
            getUserInteraction: userController.getUserInteractionFromPost,
        },
        Comment: {
            getAuthor: userController.getUserFromIdField,
        }
    },
};


export default UserDomain;
