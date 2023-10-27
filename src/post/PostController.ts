import {
    InsertPostInput, Post, PropertyFilterComparator, PropertyFilterType,
} from '../common/graphql_types';
import { QueryService } from '../database/QueryService';
import { feedController } from '../feed/FeedController';
import { Controller } from '../common/Controller';
import MetricService from '../common/MetricService';
import passesTrendingThreshold from './services/TrendingService';
import dateFormat, { masks } from "dateformat";

const postQueryService = new QueryService(['_id', 'groupId', 'feedId', 'userId', 'tags', 'filter_typeId', 'createdAt', 'updatedAt', 'isDeleted', 'fake_likes', 'FakePostCreatedAt']);

const range = (start: any, stop: any, step: any = 1) =>
    Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);

const NotDeletedFilter = {
    type: PropertyFilterType.Bool,
    property: 'isDeleted',
    comparator: PropertyFilterComparator.Is,
    term: 'false',
};

const notDeletedPostParams = (params : any[]) : any[] => [params[0], {
    ...params[1],
    input: {
        ...params[1].input,
        filters: ([{
            type: PropertyFilterType.Bool,
            property: 'isDeleted',
            comparator: PropertyFilterComparator.Is,
            term: 'false',
        },
        {
            type: PropertyFilterType.String,
            property: 'FakePostCreatedAt',
            comparator: PropertyFilterComparator.LessThanOrEqual,
            term: new Date(new Date().getTime() - 15*60000).toISOString(), // To hide the post for a moment
        }].concat(params[1].input.filters ?? [])),
    },
}, params[2], params[3]];

const getPostCreatedAt = (post: any) => {
    return ((post.FakePostCreatedAt && post.FakePostCreatedAt > post.createdAt)
            ? post.FakePostCreatedAt
            : post.createdAt).getTime() ?? 0;
}

export const postArrayPostprocessing = async (postsPromise: any) : Promise<any[]> => {
    let posts = await postsPromise;
    posts = postsPromise.then((parr: any) => {
                let posts : any = parr;
                posts = posts.map((post: any) => ({
                        ...(post._doc),
                        comments: post._doc.comments?.filter((c: any) =>
                            (c.postedAt < new Date().getTime()))
                            .sort((a: any, b: any) => a.postedAt < b.postedAt ? -1: 1) ?? []
                    }))
                    .sort((a: any, b: any) => sortingComparator(a, b));
                //console.log(posts);
                return posts;
            });
    return posts;
};

function sortingComparator(a: any, b: any) {
    if (a.isPin) return -1;
    if (b.isPin) return 1;
    return (getPostCreatedAt(a) >= getPostCreatedAt(b)) ? -1 : 1;
}

function getDaysDifferenceBetweenDates (postedAtTime : any, nowTime : any) {
    return Math.floor(Math.abs(nowTime - postedAtTime) / (1000 * 3600 * 24));
}

class PostController extends Controller<Post> {
    constructor() {
        super();
        this.setQueryService(postQueryService);
    }

    getPosts = (...params : [any, any, any, any]) => postArrayPostprocessing((this.getDocumentsByFilter as Function)(...notDeletedPostParams(params)));

    getCreatedAtFromPost = (...params : [any, any, any, any]) =>
        (`${getPostCreatedAt(params[0])}`)

    getCreatedAtFromComment = (...params : [any, any, any, any]) => (`${params[0].postedAt ?? params[0].createdAt.getTime()}`)

    getTrendingPosts = async (...params : [any, any, any, any]) : Promise<any> => {
        const universityFeeds = await feedController.getFeedsFromUniversityName(params[0], {
            input: {
                filters: [],
                sort: {
                    property: 'memberCount',
                    order: -1,
                },
            },
            universityName: params[1].universityName,
        }, params[2], params[3]);
        const universityFeedIds = universityFeeds?.map((feed) => feed._id);

        const f = (parent: any, args: any, context: any, info: any) : any => this.getDocumentsByFilterInput({
            ...args.input,
            filters: [{
                type: PropertyFilterType.Id,
                property: 'groupId',
                comparator: PropertyFilterComparator.In,
                term: universityFeedIds,
            }, NotDeletedFilter],
        },
        passesTrendingThreshold(args.universityName));
        return postArrayPostprocessing((f as Function)(...notDeletedPostParams(params)));
    }

    getPostsFromFeed = (...params : [any, any, any, any]) => postArrayPostprocessing(
        this.genGetDocumentsByForeignKey('groupId')(...notDeletedPostParams(params))
    )

    getAllPostsFromFeed = (...params : [any, any, any, any]) => postArrayPostprocessing(
        this.genGetAllDocumentsByForeignKey('groupId')(...notDeletedPostParams(params))
    )

    getTrendingPostsFromFeed = async (...params : [any, any, any, any]) : Promise<any[]> => {
        const GENERIC_TRENDING_THRESHOLD = 50.0;
        const skip = params[1]?.input?.skip ?? 0;
        const posts = postArrayPostprocessing((this.genGetAllDocumentsByForeignKey('groupId') as Function)(...notDeletedPostParams(params)));
        const all_posts = (await posts);
        const nowDate = new Date();
        const trending_posts = all_posts
        .filter((post: any) =>
                ((post.likes.length + (post.fake_likes ?? 0)) / Math.max(
                    getDaysDifferenceBetweenDates(getPostCreatedAt(post), nowDate.getTime()) - 2, 1)
                + post.comments.reduce((sumLikes: number, current: any) =>
                        (sumLikes + (current.likes.length + (current.fake_likes ?? 0))*2 + 5)
                        / Math.max(getDaysDifferenceBetweenDates(current.postedAt, nowDate.getTime()) - 2, 1),
                    0)
                    )
                    > GENERIC_TRENDING_THRESHOLD);
        const ret_posts = trending_posts.slice(skip, skip+25);
        
        return ret_posts;
    }

    

    /*
    getTrendingPostsFromfeed = async (...params : [any, any, any, any]) : Promise<any> => {
        const universityFeedIds = ([params[0]._id]).map((feed) => feed._id);
        const f = (parent: any, args: any, context: any, info: any) : any => this.getDocumentsByFilterInput({
            ...args.input,
            filters: [{
                type: PropertyFilterType.Id,
                property: 'groupId',
                comparator: PropertyFilterComparator.In,
                term: universityFeedIds,
            }, NotDeletedFilter],
        },
        passesTrendingThreshold(args.universityName));
        return postArrayPostprocessing((f as Function)(...notDeletedPostParams(params)));
    }
    */

    //getAllPostsFromUniversity = (...params : [any, any, any, any]) => postArrayPostprocessing(
    //    this.genGetAllDocumentsByForeignKey('groupId')(...notDeletedPostParams(params)),
    //)

    getPostsFromUser = (...params : [any, any, any, any]) => postArrayPostprocessing(
        this.genGetDocumentsByForeignKey('userId')(...notDeletedPostParams(params)),
    )

    getSavedPostsFromUser = (...params : [any, any, any, any]) => postArrayPostprocessing(
        this.genGetDocumentsByLocalKeyArray('savedposts')(...notDeletedPostParams(params)),
    )

    getPostsFromTag = (...params : [any, any, any, any]) => this.genGetDocumentsByForeignKey('filter_typeId')(...notDeletedPostParams(params));

    getNumLikesFromPost = (parent: any, args: any, context: any, info: any) => ((parent.likes?.length ?? 0) + (parent.fake_likes ?? 0));

    getNumDislikesFromPost = (parent: any, args: any, context: any, info: any) => parent.dislikes?.length ?? 0;

    // updatePost = (...params : [any, any, any, any]) =>
    //    this.updateDocument<Post>(...params);

    insertPost = (...params : [any, any, any, any]) => this.insertDocument<InsertPostInput>(...params);

    getDayMetrics = async (parent: any, args: { start_date: number, end_date: number }, context: any, info: any) => {
        const all_posts = await this.getAllPostsFromFeed(parent, { input: {filters: MetricService.genDateRangeFilters(args.start_date, args.end_date) } }, context, info);
        return {
            start_date: new Date(args.start_date).toLocaleDateString("en-US"),
            end_date: new Date(args.end_date).toLocaleDateString("en-US"),
            numLikes: MetricService.sumLikesOverDocuments(all_posts),
            numDislikes: MetricService.sumDislikesOverDocuments(all_posts),
            numComments: MetricService.sumCommentsOverDocuments(all_posts),
            numUniquePosters: MetricService.sumUniquePostersOverDocuments(all_posts),
            numUniqueCommenters: MetricService.sumUniqueCommentersOverDocuments(all_posts)
        }
    }

    getDailyMetrics = async (parent: any, args: { start_date: string, end_date?: string }, context: any, info: any) => {
        const start = Date.parse(args.start_date);
        const step = 1000*60*60*24;
        const end = args.end_date ? Date.parse(args.end_date) : Date.now();
        const times = range(start, end, step);
        const metrics = await Promise.all(times.map((time: any) => this.getDayMetrics(parent, { start_date: time, end_date: (time+step) }, context, info)));
        return ({
            total_likes: metrics.map((day: any) => day.numLikes),
            total_dislikes: metrics.map((day: any) => day.numDislikes),
            total_comments: metrics.map((day: any) => day.numComments),
            total_unique_posters: metrics.map((day: any) => day.numUniquePosters),
            total_unique_commenters: metrics.map((day: any) => day.numUniqueCommenters),
            dates: metrics.map((day: any) => day.start_date)
        });
    }
}

const postController = new PostController();

export { postController };
