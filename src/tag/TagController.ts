import { Controller } from '../common/Controller';
import { Tag } from '../common/graphql_types';
import { QueryService } from '../database/QueryService';

const feedCategoryQueryService = new QueryService(['_id', 'groupId', 'feedId', 'userId', 'createdAt', 'updatedAt']);

class TagController extends Controller<Tag> {

    constructor() {
        super();
        this.setQueryService(feedCategoryQueryService);
    }

    getTags = (...params : [any, any, any, any]) =>
        this.getDocumentsByFilter(...params);

    getTagsFromFeed = (...params : [any, any, any, any]) =>
        this.genGetDocumentsByLocalKey('filter_typeId')(...params)
        .then((res: Tag[]) => res[0])
    
    getTagsFromPost = (...params : [any, any, any, any]) =>
        this.genGetDocumentsByLocalKey('filter_typeId')(...params)
        .then((res: Tag[]) => res[0])

};

const tagController = new TagController();

export { tagController };
