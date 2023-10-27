import { PostGetUserInteractionArgs, User } from '../common/graphql_types';
import { QueryService } from '../database/QueryService';
import { Controller } from './../common/Controller';

const userQueryService = new QueryService(['_id', 'userId', 'isDeleted', 'createdAt', 'updatedAt', 'savedPosts']);

class UserController extends Controller<User> {

    constructor() {
        super();
        this.setQueryService(userQueryService);
    }

    getUsers = (...params : [any, any, any, any]) =>
        this.getDocumentsByFilter(...params);

    getUserFromPost = (...params : [any, any, any, any]) =>
        this.genGetDocumentsByLocalKey('userId')(...params);

    getUserFromIdField = (...params : [any, any, any, any]) =>
        this.genGetDocumentsByLocalKey('userId')(...params)
        .then((res: User[]) => res[0]);

    getUserInteractionFromPost = (parent: any, args: PostGetUserInteractionArgs) => {
        if (parent.likes.includes(args.input.userId))
            return 1;
        else if (parent.dislikes.includes(args.input.userId))
            return -1;
        else
            return 0;
    }

};

const userController = new UserController();

export { userController };
