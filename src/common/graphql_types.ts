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

export type Comment = {
  __typename?: 'Comment';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  getAuthor: User;
  numDislikes?: Maybe<Scalars['Int']>;
  numLikes?: Maybe<Scalars['Int']>;
  photos?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId?: Maybe<Scalars['ID']>;
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
  createdAt?: Maybe<Scalars['String']>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getTag?: Maybe<Tag>;
  group?: Maybe<FeedGroup>;
  photo?: Maybe<Scalars['String']>;
  section?: Maybe<FeedSection>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type FeedGetPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type FeedGetTagArgs = {
  input?: Maybe<PropertyFilterInput>;
};

export type FeedCourse = {
  __typename?: 'FeedCourse';
  name?: Maybe<Scalars['String']>;
};

export type FeedFollow = {
  __typename?: 'FeedFollow';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  getFeed: Feed;
  groupId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type FeedGroup = {
  __typename?: 'FeedGroup';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  comments: Array<Maybe<Comment>>;
  content: PostContent;
  createdAt?: Maybe<Scalars['String']>;
  dislikes: Array<Maybe<Scalars['ID']>>;
  filter_typeId?: Maybe<Scalars['ID']>;
  getAuthor: User;
  getFeed?: Maybe<Feed>;
  getNumDislikes: Scalars['Int'];
  getNumLikes: Scalars['Int'];
  isPin?: Maybe<Scalars['Boolean']>;
  getTag?: Maybe<Tag>;
  getUserInteraction: Scalars['Int'];
  getUsers?: Maybe<Array<Maybe<User>>>;
  groupId: Scalars['ID'];
  isAnonymous?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isRestricted?: Maybe<Scalars['Boolean']>;
  likes: Array<Maybe<Scalars['ID']>>;
  topics?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type PostGetTagArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type PostGetUserInteractionArgs = {
  input: UserIdInput;
};


export type PostGetUsersArgs = {
  input?: Maybe<PropertyFilterInput>;
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
  getFeedsFromUniversityName?: Maybe<Array<Maybe<Feed>>>;
  getFollowingPosts?: Maybe<Array<Maybe<Post>>>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  getTrendingPosts?: Maybe<Array<Maybe<Post>>>;
  getUserBlocks: Array<Maybe<UserBlock>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetFeedsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetFeedsFromUniversityNameArgs = {
  input?: Maybe<PropertyFilterInput>;
  universityName: Scalars['String'];
};


export type QueryGetFollowingPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
  userId?: Maybe<Scalars['ID']>;
};


export type QueryGetPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetTagsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetTrendingPostsArgs = {
  input?: Maybe<PropertyFilterInput>;
  universityName?: Maybe<Scalars['String']>;
};


export type QueryGetUserBlocksArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type QueryGetUsersArgs = {
  input?: Maybe<PropertyFilterInput>;
};

export type SortType = {
  property: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID'];
  filter: TagContent;
  getFeeds?: Maybe<Array<Maybe<Feed>>>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  type: TagType;
};


export type TagGetFeedsArgs = {
  input?: Maybe<PropertyFilterInput>;
};


export type TagGetPostsArgs = {
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

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  getFeedFollows?: Maybe<Array<Maybe<FeedFollow>>>;
  getPosts?: Maybe<Array<Maybe<Post>>>;
  getSavedPosts?: Maybe<Array<Maybe<Post>>>;
  gradelevel?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  major?: Maybe<Scalars['String']>;
  notification?: Maybe<UserNotification>;
  savedposts?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type University = {
  __typename?: 'University';
  _id: Scalars['ID'];
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