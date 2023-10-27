import { UserBlock } from '../common/graphql_types';
import { QueryService } from '../database/QueryService';
import { Controller } from './../common/Controller';

const userBlockQueryService = new QueryService(['_id', 'blockerUser', 'blockedUser']);

class UserBlockController extends Controller<UserBlock> {

    constructor() {
        super();
        this.setQueryService(userBlockQueryService);
    }

    getUserBlocks = (...params : [any, any, any, any]) =>
        this.getDocumentsByFilter(...params);

};

const userBlockController = new UserBlockController();

export { userBlockController };
