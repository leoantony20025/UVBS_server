import { PrismaClient } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Asset = objectType({
    name: "Asset",
    definition(t) {
      t.string("id");
      t.string("themeTitle");
      t.string("themeDescription");
      t.string("themePhoto");
      t.boolean("isPaymentOnline");
      t.string("upi");
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
                return await prisma.asset.findMany()
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
                await prisma.asset.create({
                    data: {
                        themeTitle: args.themeTitle,
                        themeDescription: args.themeDescription,
                        themePhoto: args.themePhoto
                    }
                })

                return await prisma.asset.findMany({})
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
                id: nonNull(stringArg()),
                themeTitle: nonNull(stringArg()),
                themeDescription: nonNull(stringArg()),
                themePhoto: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.asset.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        themeTitle: args.themeTitle,
                        themeDescription: args.themeDescription,
                        themePhoto: args.themePhoto
                    }
                })

                return await prisma.asset.findMany({})
            }
        })
    }
})

export const updateIsPaymentOnline = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updateIsPaymentOnline", {
            type: "Asset",
            args: {
                id: nonNull(stringArg()),
                isPaymentOnline: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.asset.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        isPaymentOnline: args.isPaymentOnline,
                    }
                })

                return await prisma.asset.findMany({})
            }
        })
    }
})

export const updateUPI = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updateUPI", {
            type: "Asset",
            args: {
                id: nonNull(stringArg()),
                upi: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.asset.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        upi: args.upi,
                    }
                })

                return await prisma.asset.findMany({})
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
                await prisma.asset.delete({
                    where: {
                        id: args.id,
                    }
                })

                return await prisma.asset.findMany({})
            }
        })
    }
})
