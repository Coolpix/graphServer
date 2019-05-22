function roller(parent, args, context) {
    return context.prisma.createGift({ id: parent.id }).roller()
}

function gift(parent, args, context) {
    return context.prisma.createGift({ id: parent.id }).gift()
}

module.exports = {
    roller,
    gift,
}
