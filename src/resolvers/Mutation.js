const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id}, APP_SECRET);

    return {
        token,
        user,
    }
}

async function vote(parent, args, context, info) {
    const userId = getUserId(context);
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId },
    });

    if (linkExists) {
        throw new Error('Already voted for link: ${args.linkId}')
    }

    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
    });
}

function post(parent, args, context, info) {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

async function team(parent, args, context, info) {
    return await context.prisma.createTeam({
        name: args.name
    });
}

async function player(parent, args, context, info) {
    return await context.prisma.createPlayer({
        name: args.name,
        team: { connect: { id: args.teamId } },
    });
}

async function roller(parent, args, context, info) {
    return await context.prisma.createRoller({
        name: args.name,
        avatar: args.avatar
    });
}

async function gift(parent, args, context, info) {
    return await context.prisma.createGift({
        name: args.name,
        photo: args.photo
    });
}

async function updateGift(parent, args, context, info) {
    return await context.prisma.updateGift({
        where: {
            id: args.id
        },
        data: {
            roller: { connect: { id: args.rollerID } }
        }
    });
}

async function deleteGift(parent, args, context, info) {
    return await context.prisma.deleteGift({ id: args.id });
}

async function deleteRoller(parent, args, context, info) {
    return await context.prisma.deleteRoller({ id: args.id });
}

module.exports = {
    signup,
    login,
    post,
    vote,
    team,
    player,
    roller,
    gift,
    updateGift,
    deleteGift,
    deleteRoller
}
