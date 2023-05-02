import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const Product = objectType({
    name: "Product",
    definition(t) {
      t.string("id");
      t.string("name");
      t.string("description");
      t.int("price");
      t.string("photo");
      t.int("stock");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allProducts = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allProducts", {
            type: "Product",
            async resolve(_root, args) {
                return await prisma.Product.findMany()
            }
        })
    }
})

export const addProduct = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("addProduct", {
            type: "Product",
            args: {
                name: nonNull(stringArg()),
                description: nonNull(stringArg()),
                price: nonNull(intArg()),
                photo: nonNull(stringArg()),
                stock: nonNull(intArg())
            },
            async resolve(_root, args) {
                await prisma.Product.create({
                    data: {
                        name: args.name,
                        description: args.description,
                        price: args.price,
                        photo: args.photo,
                        stock: args.stock
                    }
                })

                return await prisma.Product.findMany({})
            }
        })
    }
})

export const updateProduct = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("updateProduct", {
            type: "Product",
            args: {
                id: nonNull(stringArg()),
                name: nonNull(stringArg()),
                description: nonNull(stringArg()),
                price: nonNull(intArg()),
                photo: nonNull(stringArg()),
                stock: nonNull(intArg())
            },
            async resolve(_root, args) {
                await prisma.Product.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        name: args.name,
                        description: args.description,
                        price: args.price,
                        photo: args.photo,
                        stock: args.stock
                    }
                })

                return await prisma.Product.findMany({})
            }
        })
    }
})

export const deleteProduct = extendType({
    type: "Mutation",
    definition(t) {
        t.list.field("deleteProduct", {
            type: "Product",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                await prisma.Product.delete({
                    where: {
                        id: args.id,
                    }
                })

                return await prisma.Product.findMany({})
            }
        })
    }
})
