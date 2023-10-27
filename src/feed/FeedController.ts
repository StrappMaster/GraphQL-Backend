import { Maybe } from 'graphql-tools';
import { Model } from 'mongoose';
import {
    Feed, FeedFollow, Post, PropertyFilterComparator, PropertyFilterInput, PropertyFilterType,
} from '../common/graphql_types';
import { QueryService } from '../database/QueryService';
import { postController, postArrayPostprocessing } from '../post/PostController';
import { Controller } from '../common/Controller';

// type FeedFollowType = typeof FeedFollowSchema;
type FeedFollowType = FeedFollow;

const feedQueryService = new QueryService(['_id', 'groupId', 'feedId', 'userId', 'createdAt', 'updatedAt', 'tags', 'university.name', 'collegeFeedId', 'universitySpecificFeedId']);

class FeedController extends Controller<Feed> {
    feedFollowModel!: Model<FeedFollowType>;

    constructor() {
        super();
        this.setQueryService(feedQueryService);
    }

    setFeedFollowModel(model: Model<any>) {
        this.feedFollowModel = model;
    }

    getFeeds = (...params : [any, any, any, any]) => this.getDocumentsByFilter(...params);

    getFeedsByTag = (...params : [any, any, any, any]) => this.genGetDocumentsByForeignKeyArray('tags')(...params);

    getFeedFollows = (...params : [any, any, any, any]) : Promise<FeedFollowType[]> => this.getDocumentsByFilter(...params, this.feedFollowModel) as any;

    getFeedFollowsFromUser = (...params : [any, any, any, any]) => this.genGetDocumentsByForeignKey('userId', this.feedFollowModel)(...params)

    getFeedFromPost = (...params : [any, any, any, any]) => this.genGetDocumentsByLocalKey('groupId')(...params)
        .then((res: Feed[]) => res[0])

    getFeedFromFollow = (...params : [any, any, any, any]) => this.genGetDocumentsByLocalKey('groupId')(...params)
        .then((res: Feed[]) => res[0])

    getUniversitySpecificFeedFromUniversity = (...params : [any, any, any, any]) =>
        this.genGetDocumentsByLocalKey('universitySpecificFeedId')(...params)
        .then((res: Feed[]) => res[0])

    getCollegeFeedFromUniversity = (...params : [any, any, any, any]) =>
        this.genGetDocumentsByLocalKey('collegeFeedId')(...params)
        .then((res: Feed[]) => res[0])

    getFollowingFeedFromUserId = async (parent: any, args: {input: PropertyFilterInput, userId: string}, context: any, info: any) => {
        const FeedFollowsPromise : Promise<FeedFollowType[]> = this.getFeedFollows(parent, {
            input: {
                filters: [{
                    type: PropertyFilterType.Id,
                    property: 'userId',
                    comparator: PropertyFilterComparator.Is,
                    term: args.userId,
                }],
            },
        }, context, info);
        const FeedFollows : FeedFollowType[] = await FeedFollowsPromise;
        const FollowingFeedIds = FeedFollows.map((follow: FeedFollowType) => follow.groupId);
        const res = postController.getPosts(parent,
            {
                input: {
                    filters: [{
                        type: PropertyFilterType.Id,
                        property: 'groupId',
                        comparator: PropertyFilterComparator.In,
                        term: FollowingFeedIds as unknown,
                    }].concat(args.input.filters),
                    sort: args.input.sort,
                    limit: args.input.limit,
                    skip: args.input.skip,
                } as PropertyFilterInput,
            }, context, info)
            .then((documents: Maybe<Post[]>) : Post[] => (documents?.filter((doc) => !(doc.isDeleted ?? false)) ?? []));
            return res;
    }

    getFeedsFromUniversityName = async (parent: any, args: {input: PropertyFilterInput, universityName: string}, context: any, info: any) => {
        const uName = (args.universityName == 'michigan_state') ? 'Michigan State University'
            : (args.universityName == 'university_of_toronto') ? 'University of Toronto'
                : (args.universityName == 'university_of_michigan') ? 'University of Michigan - Ann Arbor'
                    : 'BAD_UNIVERSITY_NAME';
        return this.getDocumentsByFilter(parent, {
            input: {
                ...args.input,
                filters: args.input.filters.concat([{
                    type: PropertyFilterType.String,
                    property: 'university.name',
                    comparator: PropertyFilterComparator.Is,
                    term: uName,
                }]),
            },
        }, context, info);
    }

}

const feedController = new FeedController();

export { feedController };
