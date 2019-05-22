function roller(parent, args, context) {
    return context.prisma.gift({id: parent.id}).roller();
}

module.exports = {
    roller,
}
