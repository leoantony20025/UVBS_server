import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Shipping = objectType({
    name: "Shipping",
    definition(t) {
      t.string("id");
      t.field("user", {type: "User"}),
      t.string("line1");
      t.string("line2");
      t.string("city");
      t.string("state");
      t.string("country");
      t.int("zip");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allShipping = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allShipping", {
            type: "Shipping",
            async resolve(_root, args) {
                return await prisma.shipping.findMany()
            }
        })
    }
})

export const createShipping = extendType({
    type: "Mutation",
    definition(t) {
        t.field("upsertShipping", {
            type: "User",
            args: {
                userId: nonNull(stringArg()),
                line1: nonNull(stringArg()),
                line2: nonNull(stringArg()),
                city: nonNull(stringArg()),
                state: nonNull(stringArg()),
                country: nonNull(stringArg()),
                zip: nonNull(intArg()),
            },
            async resolve(_root, args) {
                await prisma.shipping.upsert({
                    where: {
                        userId: args.userId
                    },
                    create: {
                        userId: args.userId,
                        line1: args.line1,
                        line2: args.line2,
                        city: args.city,
                        state: args.state,
                        country: args.country,
                        zip: args.zip,
                    },
                    update: {
                        line1: args.line1,
                        line2: args.line2,
                        city: args.city,
                        state: args.state,
                        country: args.country,
                        zip: args.zip,
                    },
                })

                return await prisma.user.findUnique({
                    where: {
                        id: args.userId
                    },
                    include: {
                        cart: {
                            include: {
                                products: {
                                    include: {
                                        product: true
                                    }
                                }
                            }
                        },
                        orders: true,
                        shipping: true
                    }
                })
            }
        })
    }
})
