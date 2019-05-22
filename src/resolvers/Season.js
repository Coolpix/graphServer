function teams(parent, args, context) {
    return context.prisma.season({id: parent.id}).teams();
}

module.exports = {
    teams,
}
