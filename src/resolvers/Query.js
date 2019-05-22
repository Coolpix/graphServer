async function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { url_contains: args.filter },
        ],
    } : {};

    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    });

    const count = await context.prisma.linksConnection({
        where,
    })
        .aggregate()
        .count();

    return {
        links,
        count,
    };
}

async function teams(parent, args, context, info) {
    const teams = await context.prisma.teams({});

    return teams;
}

async function players(parent, args, context, info) {
    const players = await context.prisma.players({});

    return players;
}

async function rollers(parent, args, context, info) {
    const rollers = await context.prisma.rollers({});

    return rollers;
}

async function gifts(parent, args, context, info) {
    const gifts = await context.prisma.gifts({});

    return gifts;
}

async function roller(parent, args, context, info) {
    const roller = await context.prisma.roller({id: args.id});

    return roller;
}

module.exports = {
    teams,
    players,
    feed,
    rollers,
    roller,
    gifts
}
