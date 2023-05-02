import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const CartProduct = objectType({
    name: "CartProduct",
    definition(t) {
      t.string("id");
      t.field("user", {type: "User"}),
      t.string("userId");
      t.field("product", {type: "Product"}),
      t.string("productId");
      t.field("cart", {type: "Cart"}),
      t.string("cartId");
      t.int("quantity");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allCartProducts = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allCartProducts", {
            type: "CartProduct",
            async resolve(_root, args) {
                return await prisma.cartProduct.findMany()
            }
        })
    }
})

export const addToCartProduct = extendType({
    type: "Mutation",
    definition(t) {
        t.field("addToCartProduct", {
            type: "User",
            args: {
                userId: nonNull(stringArg()),
                productId: nonNull(stringArg()),
                cartId: nonNull(stringArg()),
                quantity: nonNull(intArg()),
            },
            async resolve(_root, args) {
                await prisma.cartProduct.create({
                    data: {
                        userId: args.userId,
                        productId: args.productId,
                        cartId: args.cartId,
                        quantity: args.quantity
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


export const removeFromCartProduct = extendType({
    type: "Mutation",
    definition(t) {
        t.field("removeFromCartProduct", {
            type: "User",
            args: {
                userId: nonNull(stringArg()),
                cartProductId: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.cartProduct.delete({
                    where: {
                        id: args.cartProductId
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
                        shipping: true
                    }
                })
            }
        })
    }
})
