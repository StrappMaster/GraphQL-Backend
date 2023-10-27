export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CloutPoints = {
  __typename?: 'CloutPoints';
  postlikes_received: Scalars['Int'];
  commentlikes_received: Scalars['Int'];
  comments_received: Scalars['Int'];
};

export type Comment = {
  __typename?: 'Comment';
  _id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Scalars['String']>>>;
  numLikes?: Maybe<Scalars['Int']>;
  numDislikes?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  postedAt?: Maybe<Scalars['String']>;
  getAuthor: User;
};

export type CommentInsert = {
  description?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ContentInsert = {
  title: Scalars['String'];
  photos?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Feed = {
  __typename?: 'Feed';
  _id: Scalars['ID'];
  course?: Maybe<FeedCourse>;
  section?: Maybe<FeedSection>;
  group?: Maybe<FeedGroup>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getTrendingPosts?: Maybe<Array<Maybe<Post>>>;
  getTag?: Maybe<Tag>;
  getDailyMetrics: FeedMetrics;
};


export type FeedGetPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type FeedGetTrendingPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type FeedGetTagArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type FeedGetDailyMetricsArgs = {
  start_date: Scalars['String'];
  end_date?: Maybe<Scalars['String']>;
};

export type FeedCourse = {
  __typename?: 'FeedCourse';
  name?: Maybe<Scalars['String']>;
};

export type FeedFollow = {
  __typename?: 'FeedFollow';
  _id: Scalars['ID'];
  userId: Scalars['ID'];
  groupId: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  getFeed: Feed;
};

export type FeedGroup = {
  __typename?: 'FeedGroup';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type FeedMetrics = {
  __typename?: 'FeedMetrics';
  dates?: Maybe<Array<Maybe<Scalars['String']>>>;
  total_likes?: Maybe<Array<Maybe<Scalars['Int']>>>;
  total_dislikes?: Maybe<Array<Maybe<Scalars['Int']>>>;
  total_comments?: Maybe<Array<Maybe<Scalars['Int']>>>;
  total_unique_posters?: Maybe<Array<Maybe<Scalars['Int']>>>;
  total_unique_commenters?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type FeedSection = {
  __typename?: 'FeedSection';
  name?: Maybe<Scalars['String']>;
};

export type InsertCommentInput = {
  postId: Scalars['ID'];
  document: CommentInsert;
};

export type InsertPostInput = {
  document: PostInsert;
};

export type Mutation = {
  __typename?: 'Mutation';
  insertPost?: Maybe<Post>;
  insertComment?: Maybe<Comment>;
};


export type MutationInsertPostArgs = {
  input?: Maybe<InsertPostInput>;
};


export type MutationInsertCommentArgs = {
  input?: Maybe<InsertCommentInput>;
};

export type NameInput = {
  name: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  groupId: Scalars['ID'];
  userId: Scalars['ID'];
  content: PostContent;
  likes: Array<Maybe<Scalars['ID']>>;
  dislikes: Array<Maybe<Scalars['ID']>>;
  filter_typeId?: Maybe<Scalars['ID']>;
  getNumLikes: Scalars['Int'];
  getNumDislikes: Scalars['Int'];
  isPin?: Maybe<Scalars['Boolean']>;
  isRestricted?: Maybe<Scalars['Boolean']>;
  isAnonymous?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  topics?: Maybe<Array<Maybe<Scalars['String']>>>;
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  postedAt?: Maybe<Scalars['String']>;
  getTag?: Maybe<Tag>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  getAuthor: User;
  getUserInteraction: Scalars['Int'];
  getFeed?: Maybe<Feed>;
};


export type PostGetTagArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type PostGetUsersArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type PostGetUserInteractionArgs = {
  input: UserIdInput;
};

export type PostContent = {
  __typename?: 'PostContent';
  _id?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type PostInsert = {
  groupId: Scalars['ID'];
  userId: Scalars['ID'];
  content: ContentInsert;
  tags: Array<Maybe<Scalars['ID']>>;
};

export type PropertyFilter = {
  type: PropertyFilterType;
  comparator: PropertyFilterComparator;
  property: Scalars['String'];
  term: Scalars['String'];
  clientUserId?: Maybe<Scalars['ID']>;
};

export enum PropertyFilterCombinator {
  And = 'AND',
  Or = 'OR'
}

export enum PropertyFilterComparator {
  Is = 'Is',
  IsNot = 'IsNot',
  Has = 'Has',
  NotHas = 'NotHas',
  In = 'In',
  NotIn = 'NotIn',
  GreaterThan = 'GreaterThan',
  GreaterThanOrEqual = 'GreaterThanOrEqual',
  LessThan = 'LessThan',
  LessThanOrEqual = 'LessThanOrEqual'
}

export type PropertyFilterInput = {
  filters: Array<PropertyFilter>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortType>;
  skip?: Maybe<Scalars['Int']>;
};

export enum PropertyFilterType {
  Number = 'NUMBER',
  Float = 'FLOAT',
  Bool = 'BOOL',
  String = 'STRING',
  Id = 'ID',
  List = 'LIST',
  Object = 'OBJECT'
}

export type Query = {
  __typename?: 'Query';
  getFeeds?: Maybe<Array<Maybe<Feed>>>;
  getFollowingPosts?: Maybe<Array<Maybe<Post>>>;
  getFeedsFromUniversityName?: Maybe<Array<Maybe<Feed>>>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getTrendingPosts?: Maybe<Array<Maybe<Post>>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  getSettings?: Maybe<Array<Maybe<Settings>>>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  getUserBlocks: Array<Maybe<UserBlock>>;
  getUniversities?: Maybe<Array<Maybe<University>>>;
  getUniversityByName?: Maybe<University>;
  getUniversityByDomain?: Maybe<University>;
};


export type QueryGetFeedsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetFollowingPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryGetFeedsFromUniversityNameArgs = {
  input?: Maybe<PropertyFilterInput>;
  universityName: Scalars['String'];
};


export type QueryGetPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetTrendingPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
  universityName?: Maybe<Scalars['String']>;
};


export type QueryGetUsersArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetTagsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetUserBlocksArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetSettingsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetUniversitiesArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetUniversityByNameArgs = {
  input?: Maybe<NameInput>;
};


export type QueryGetUniversityByDomainArgs = {
  input?: Maybe<NameInput>;
};

export type SortType = {
  property: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID'];
  type: TagType;
  filter: TagContent;
  isDeleted?: Maybe<Scalars['Boolean']>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getFeeds?: Maybe<Array<Maybe<Feed>>>;
};


export type TagGetPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type TagGetFeedsArgs = {
  input?: Maybe<PropertyFilterInput>;
};

export type TagContent = {
  __typename?: 'TagContent';
  title?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export enum TagType {
  FeedCategory = 'FEED_CATEGORY',
  PostCategory = 'POST_CATEGORY',
  UserFlag = 'USER_FLAG'
}

export type University = {
  __typename?: 'University';
  _id: Scalars['ID'];
  university: UniversityNaming;
  isDeleted: Scalars['Boolean'];
  isBlocked: Scalars['Boolean'];
  createdAt: Scalars['String'];
  color: Scalars['String'];
  getUniversitySpecificFeed?: Maybe<Feed>;
  getCollegeFeed?: Maybe<Feed>;
};

export type UniversityNaming = {
  __typename?: 'UniversityNaming';
  domains: Array<Maybe<Scalars['String']>>;
  name: Scalars['String'];
  shortname: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  major?: Maybe<Scalars['String']>;
  gradelevel?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  notification?: Maybe<UserNotification>;
  savedposts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  clout_points?: Maybe<CloutPoints>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getSavedPosts?: Maybe<Array<Maybe<Post>>>;
  getFeedFollows?: Maybe<Array<Maybe<FeedFollow>>>;
  getUniversity?: Maybe<University>;
};


export type UserGetPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type UserGetSavedPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};

export type UserBlock = {
  __typename?: 'UserBlock';
  _id: Scalars['ID'];
  blockerUser: Scalars['ID'];
  blockedUser: Scalars['ID'];
  createdAt: Scalars['String'];
};

export type UserIdInput = {
  userId: Scalars['ID'];
};

export type UserNotification = {
  __typename?: 'UserNotification';
  state?: Maybe<Scalars['Boolean']>;
  lastSeen?: Maybe<Scalars['String']>;
};

export type Settings = {
  __typename?: 'Settings';
  _id: Scalars['ID'];
  cloutCommentsMultiplier?: Maybe<Scalars['Int']>;
};
