import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { getUserAuthState } from './auth/index';
import { connectDatabase } from './database/index';
import FeedDomain from './feed';
import initFeedModel from './feed/FeedModel';
import UniversityDomain from './university';
import initUniversityModel from './university/UniversityModel';
import PostDomain from './post';
import initPostModel from './post/PostModel';
import SettingsDomain from './settings';
import initSettingsModel from './settings/SettingsModel';
import TagDomain from './tag';
import initTagModel from './tag/TagModel';
import UserDomain from './user';
import initUserModel from './user/UserModel';
import UserBlockDomain from './userBlock';
import initUserBlockModel from './userBlock/UserBlockModel';
const PORT = process.env.PORT || 8000;
const app = express();

const domainList = [PostDomain, FeedDomain, SettingsDomain, UniversityDomain, UserDomain, TagDomain, UserBlockDomain];

const graphqlHandlers = domainList.reduce((
    (prev: any, curr: any) => _.merge(prev, curr)
), {});

const globalContext = ({ req } : any) => ({
    ...getUserAuthState(req.headers.auth),
})

const startApollo = async (app: any) => {
    const typeDefs = [
                      '/common/schemas/Query.graphql',
                      '/common/schemas/Mutation.graphql',
                      '/common/schemas/QueryService.graphql',
                      '/common/schemas/Feed.graphql',
                      '/common/schemas/University.graphql',
                      '/common/schemas/Post.graphql',
                      '/common/schemas/User.graphql',
                      '/common/schemas/UserBlock.graphql',
                      '/common/schemas/Tag.graphql',
                      '/common/schemas/Settings.graphql']
                      .reduce( (prev, curr, i) => prev + (readFileSync( path.join(__dirname, curr) ) + '\n'), "" );
    const server = new ApolloServer({
        typeDefs,
        resolvers: graphqlHandlers.resolvers,
        context: globalContext,
        introspection: true,
        playground: true,
        cacheControl: {
            defaultMaxAge: 10,
        },
    });
    server.applyMiddleware({ app });
    return new Promise((resolve: any, reject: any) => {
        resolve(server);
        reject();
    });
};

const startServer = () => {

    app.listen({ port: PORT }, () => {
        // eslint-disable-next-line
        startApollo(app).then((server: any) => {
        // eslint-disable-next-line no-console
            console.log(
                `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
            );
        });
    });

}

connectDatabase().then(() => {
    initUserModel();
    initUserBlockModel();
    initPostModel();
    initFeedModel();
    initSettingsModel();
    initUniversityModel();
    initTagModel();
})

startServer();
