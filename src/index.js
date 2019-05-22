const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');
const Player = require('./resolvers/Player');
const Team = require('./resolvers/Team');
const Season = require('./resolvers/Season');
const Roller = require('./resolvers/Roller');
const Gift = require('./resolvers/Gift');
const doGift = require('./resolvers/createGift');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote,
    Player,
    Team,
    Season,
    Roller,
    Gift,
    doGift
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
