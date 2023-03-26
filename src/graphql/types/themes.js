import { PrismaClient } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Users = objectType({
    name: "Video",
    definition(t) {
      t.string("id");
      t.string("title");
      t.string("description");
      t.string("thumbnail");
      t.string("videoUrl");
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
                return await prisma.video.findMany({})
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
                return await prisma.user.create({
                    data: {
                        title: args.title,
                        description: args.description,
                        thumbnail: args.thumbnail,
                        videoUrl: args.videoUrl
                    }
                })
            }
        })
    }
})