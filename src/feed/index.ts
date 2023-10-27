import { feedController } from './FeedController';

const FeedDomain = {
    resolvers: {
        Query: {
            getFeeds: feedController.getFeeds,
            getFollowingPosts: feedController.getFollowingFeedFromUserId,
            getFeedsFromUniversityName: feedController.getFeedsFromUniversityName
        },
        Tag: {
            getFeeds: feedController.getFeedsByTag,
        },
        Post: {
            getFeed: feedController.getFeedFromPost,
        },
        User: {
            getFeedFollows: feedController.getFeedFollowsFromUser
        },
        FeedFollow: {
            getFeed: feedController.getFeedFromFollow
        },
        University: {
            getUniversitySpecificFeed: feedController.getUniversitySpecificFeedFromUniversity,
            getCollegeFeed: feedController.getCollegeFeedFromUniversity
        }
    },
};


export default FeedDomain;
