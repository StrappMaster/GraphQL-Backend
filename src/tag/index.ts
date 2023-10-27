import { tagController } from './TagController';

const TagDomain = {
    resolvers: {
        Query: {
            getTags: tagController.getTags,
        },
        Feed: {
            getTag: tagController.getTagsFromFeed,
        },
        Post: {
            getTag: tagController.getTagsFromPost,
        }
    },
};


export default TagDomain;
