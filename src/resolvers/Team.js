function players(parent, args, context) {
    return context.prisma.team({id: parent.id}).players();
}

function season(parent, args, context) {
    return context.prisma.team({id: parent.id}).season();
}

module.exports = {
    players,
}
