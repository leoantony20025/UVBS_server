import { PrismaClient } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Comment = objectType({
    name: "Comment",
    definition(t) {
      t.string("id");
      t.field("user", {type: "User"});
      t.string("msg");
      t.field("video", {type: "Video"});
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });

  export const allComments = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allComments", {
            type: "Comment",
            async resolve(_root, args) {
                return await prisma.comment.findMany({
                    include: {
                        video: true,
                        user: true
                    }
                })
            }
        })
    }
})

export const addComment = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addComment", {
            type: "Video",
            args: {
                userId: nonNull(stringArg()),
                videoId: nonNull(stringArg()),
                msg: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                const comment = await prisma.comment.create({
                    data: {
                        userId: args.userId,
                        videoId: args.videoId,
                        msg: args.msg,
                    }
                })

                if (comment) {
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
            }
        })
    }
})

