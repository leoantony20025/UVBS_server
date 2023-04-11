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
      t.int("likes");
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
        t.field("addVideo", {
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

export const addLike = extendType({
    type: "Mutation",
    definition(t) {
        t.field("addLike", {
            type: "Video",
            args: {
                videoId: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                return await prisma.video.update({
                    where: {
                        id: args.videoId
                    },
                    data: {
                        likes: {
                            increment: 1
                        }
                    }
                })
            }
        })
    }
})