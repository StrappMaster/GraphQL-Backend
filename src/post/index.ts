import { postController } from './PostController';

const PostDomain = {
    resolvers: {
        Query: {
            getPosts: postController.getPosts,
            getTrendingPosts: postController.getTrendingPosts,
        },
        Tag: {
            getPosts: postController.getPostsFromTag,
        },
        Feed: {
            getPosts: postController.getPostsFromFeed,
            getTrendingPosts: postController.getTrendingPostsFromFeed,
            getDailyMetrics: postController.getDailyMetrics
        },
        User: {
            getPosts: postController.getPostsFromUser,
            getSavedPosts: postController.getSavedPostsFromUser,
        },
        Post: {
            getNumLikes: postController.getNumLikesFromPost,
            getNumDislikes: postController.getNumDislikesFromPost,
            createdAt: postController.getCreatedAtFromPost,
        },
        Comment: {
            createdAt: postController.getCreatedAtFromComment
        }
    },
};

export default PostDomain;
