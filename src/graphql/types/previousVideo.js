import { PrismaClient } from "@prisma/client";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const PreviousVideo = objectType({
    name: "PreviousVideo",
    definition(t) {
      t.string("id");
      t.string("title");
      t.int("year");
      t.string("thumbnail");
      t.string("url");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allPreviousVideos = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allPreviousVideos", {
            type: "PreviousVideo",
            async resolve(_root, args) {
                return await prisma.previousVideo.findMany({
                    orderBy: {
                        year: "desc"
                    }
                })
            }
        })
    }
})

export const addPreviousVideo = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addPreviousVideo", {
            type: "PreviousVideo",
            args: {
                title: nonNull(stringArg()),
                year: nonNull(intArg()),
                thumbnail: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.previousVideo.create({
                    data: {
                        title: args.title,
                        year: args.year,
                        thumbnail: args.thumbnail,
                        url: args.url
                    }
                })

                return await prisma.previousVideo.findMany({
                    orderBy: {
                        year: "desc"
                    }
                })
            }
        })
    }
})

export const updatePreviousVideo = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updatePreviousVideo", {
            type: "PreviousVideo",
            args: {
                id: nonNull(stringArg()),
                title: nonNull(stringArg()),
                year: nonNull(intArg()),
                thumbnail: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.previousVideo.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        title: args.title,
                        year: args.year,
                        thumbnail: args.thumbnail,
                        url: args.url
                    }
                })

                return await prisma.previousVideo.findMany({
                    orderBy: {
                        year: "desc"
                    }
                })
            }
        })
    }
})

export const deletePreviousVideo = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("deletePreviousVideo", {
            type: "PreviousVideo",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.previousVideo.delete({
                    where: {
                        id: args.id,
                    }
                })

                return await prisma.previousVideo.findMany({
                    orderBy: {
                        year: "desc"
                    }
                })
            }
        })
    }
})
