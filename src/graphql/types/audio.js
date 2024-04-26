import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Audio = objectType({
    name: "Audio",
    definition(t) {
      t.string("id");
      t.int("sno");
      t.string("title");
      t.string("description");
      t.string("thumbnail");
      t.string("audioUrl");
      t.boolean("song");
      t.string("language");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allAudios = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allAudios", {
            type: "Audio",
            async resolve(_root, args) {
                return await prisma.audio.findMany({
                    orderBy: {
                        sno: "asc"
                    }
                })
            }
        })
    }
})

export const addAudio = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addAudio", {
            type: "Audio",
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                thumbnail: nonNull(stringArg()),
                audioUrl: nonNull(stringArg()),
                song: nonNull(booleanArg()),
                language: nonNull(stringArg())
            },
            async resolve(_root, args) {
                await prisma.audio.create({
                    data: {
                        title: args.title,
                        description: args.description,
                        thumbnail: args.thumbnail,
                        audioUrl: args.audioUrl,
                        song: args.song,
                        language: args.language
                    }
                })

                return await prisma.audio.findMany({})
            }
        })
    }
})

export const updateAudio = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updateAudio", {
            type: "Audio",
            args: {
                id: nonNull(stringArg()),
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                thumbnail: nonNull(stringArg()),
                audioUrl: nonNull(stringArg()),
                song: nonNull(booleanArg()),
                language: nonNull(stringArg())
            },
            async resolve(_root, args) {
                await prisma.audio.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        title: args.title,
                        description: args.description,
                        thumbnail: args.thumbnail,
                        audioUrl: args.audioUrl,
                        song: args.song,
                        language: args.language
                    }
                })

                return await prisma.audio.findMany({})
            }
        })
    }
})

export const deleteAudio = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("deleteAudio", {
            type: "Audio",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.audio.delete({
                    where: {
                        id: args.id
                    }
                })

                return await prisma.audio.findMany({})
            }
        })
    }
})
