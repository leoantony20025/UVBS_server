import { PrismaClient } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Video = objectType({
    name: "Video",
    definition(t) {
      t.string("id");
      t.string("title");
      t.string("description");
      t.string("thumbnail");
      t.string("videoUrl");
      t.int("likesCount");
      t.list.field("likes", {type: "Like"});
      t.list.field("comments", {type: "Comment"});
      t.string("theme");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allVideos = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allVideos", {
            type: "Video",
            async resolve(_root, args) {
                return await prisma.video.findMany({
                    include: {
                        likes: {
                            include: {
                                user: true
                            }
                        },
                        comments: {
                            include: {
                                user: true
                            }
                        }
                    }
                })
            }
        })
    }
})

export const addVideo = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addVideo", {
            type: "Video",
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                thumbnail: nonNull(stringArg()),
                videoUrl: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.video.create({
                    data: {
                        title: args.title,
                        description: args.description,
                        thumbnail: args.thumbnail,
                        videoUrl: args.videoUrl
                    }
                })

                return await prisma.video.findMany({
                    include: {
                        likes: {
                            include: {
                                user: true
                            }
                        },
                        comments: {
                            include: {
                                user: true
                            }
                        }
                    }
                })
            }
        })
    }
})

export const updateVideo = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updateVideo", {
            type: "Video",
            args: {
                id: nonNull(stringArg()),
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                thumbnail: nonNull(stringArg()),
                videoUrl: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.video.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        title: args.title,
                        description: args.description,
                        thumbnail: args.thumbnail,
                        videoUrl: args.videoUrl
                    }
                })

                return await prisma.video.findMany({
                    include: {
                        likes: {
                            include: {
                                user: true
                            }
                        },
                        comments: {
                            include: {
                                user: true
                            }
                        }
                    }
                })
            }
        })
    }
})

export const deleteVideo = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("deleteVideo", {
            type: "Video",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.video.delete({
                    where: {
                        id: args.id,
                    }
                })

                return await prisma.video.findMany({
                    include: {
                        likes: {
                            include: {
                                user: true
                            }
                        },
                        comments: {
                            include: {
                                user: true
                            }
                        }
                    }
                })
            }
        })
    }
})
