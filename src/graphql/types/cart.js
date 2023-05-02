import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Cart = objectType({
    name: "Cart",
    definition(t) {
      t.string("id");
      t.field("user", {type: "User"}),
      t.string("userId");
      t.list.field("products", {type: "CartProduct"}),
      t.int("price");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


export const allCarts = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allCarts", {
            type: "Cart",
            async resolve(_root, args) {
                return await prisma.cart.findMany()
            }
        })
    }
})

export const createCart = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createCart", {
            type: "Cart",
            args: {
                userId: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.cart.create({
                    
                    data: {
                        userId: args.userId,
                        price: 0
                    },
                })

                return await prisma.cart.findMany()
            }
        })
    }
})
