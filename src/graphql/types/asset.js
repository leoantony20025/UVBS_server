import { PrismaClient } from "@prisma/client";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Asset = objectType({
    name: "Asset",
    definition(t) {
      t.string("id");
      t.string("themeTitle");
      t.string("themeDescription");
      t.string("themePhoto");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allAssets = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allAssets", {
            type: "Asset",
            async resolve(_root, args) {
                return await prisma.Asset.findMany()
            }
        })
    }
})

export const addAsset = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addAsset", {
            type: "Asset",
            args: {
                themeTitle: nonNull(stringArg()),
                themeDescription: nonNull(stringArg()),
                themePhoto: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.Asset.create({
                    data: {
                        themeTitle: args.themeTitle,
                        themeDescription: args.themeDescription,
                        themePhoto: args.themePhoto
                    }
                })

                return await prisma.Asset.findMany({})
            }
        })
    }
})

export const updateAsset = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updateAsset", {
            type: "Asset",
            args: {
                themeTitle: nonNull(stringArg()),
                themeDescription: nonNull(stringArg()),
                themePhoto: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.Asset.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        themeTitle: args.themeTitle,
                        themeDescription: args.themeDescription,
                        themePhoto: args.themePhoto
                    }
                })

                return await prisma.Asset.findMany({})
            }
        })
    }
})

export const deleteAsset = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("deleteAsset", {
            type: "Asset",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.Asset.delete({
                    where: {
                        id: args.id,
                    }
                })

                return await prisma.Asset.findMany({})
            }
        })
    }
})
