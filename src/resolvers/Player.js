function team(parent, args, context) {
    return context.prisma.player({id: parent.id}).team();
}

module.exports = {
    team,
}
