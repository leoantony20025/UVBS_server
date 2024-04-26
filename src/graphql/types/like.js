import { PrismaClient } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Like = objectType({
    name: "Like",
    definition(t) {
      t.string("id");
      t.string("userId");
      t.string("videoId");
      t.field("user", {type: "User"});
      t.field("video", {type: "Video"});
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
});

export const allLikes = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allLikes", {
            type: "Like",
            async resolve(_root, args) {
                return await prisma.like.findMany({
                    include: {
                        video: true,
                        user: true
                    }
                })
            }
        })
    }
})


export const addLike = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addLike", {
            type: "Video",
            args: {
                userId: nonNull(stringArg()),
                videoId: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                const isLiked = await prisma.like.create({
                    data: {
                        userId: args.userId,
                        videoId: args.videoId,
                    }
                })
    
                if (isLiked) {
                    return await prisma.video.findMany({
                        orderBy: {
                            sno: "asc"
                        },
                        include: {
                            likes: {
                                include: {
                                    user: true
                                }
                            },
                            comments: {
                                orderBy: {
                                    createdAt: "desc"
                                },
                                include: {
                                    user: true
                                }
                            }
                        }
                    })
                }
            }
        })
    }
})

export const removeLike = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("removeLike", {
            type: "Video",
            args: {
                userId: nonNull(stringArg()),
                videoId: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                const isLikedRemoved = await prisma.like.delete({
                    where: {
                        AND: {
                            userId: args.userId,
                            videoId: args.videoId,
                        }
                    }
                })
    
                if (isLikedRemoved) {
                    return await prisma.video.findMany({
                        orderBy: {
                            sno: "asc"
                        },
                        include: {
                            likes: {
                                include: {
                                    user: true
                                }
                            },
                            comments: {
                                orderBy: {
                                    createdAt: "desc"
                                },
                                include: {
                                    user: true
                                }
                            }
                        }
                    })
                }
            }
        })
    }
})

export const removeAllLikes = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("removeAllLikes", {
            type: "Video",
            async resolve(_root, args) {
                const isLikedRemoved = await prisma.like.deleteMany({
                })
    
                if (isLikedRemoved) {
                    return await prisma.video.findMany({
                        orderBy: {
                            sno: "asc"
                        },
                        include: {
                            likes: {
                                include: {
                                    user: true
                                }
                            },
                            comments: {
                                orderBy: {
                                    createdAt: "desc"
                                },
                                include: {
                                    user: true
                                }
                            }
                        }
                    })
                }
            }
        })
    }
})



