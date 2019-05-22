function gift(parent, args, context) {
    return context.prisma.roller({id: parent.id}).gift();
}

module.exports = {
    gift,
}
