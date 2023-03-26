import { extendType, nonNull, objectType, stringArg } from "nexus";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const User = objectType({
    name: "User",
    definition(t) {
      t.string("id");
      t.string("name");
      t.string("email");
      t.string("password");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });

export const allUsers = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allUsers", {
            type: "User",
            async resolve(_root, args) {
                return await prisma.user.findMany({})
            }
        })
    }
})

export const signup = extendType({
    type: "Mutation",
    definition(t) {
        t.field("signup", {
            type: "User",
            args: {
                email: nonNull(stringArg()),
                name: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                return await prisma.user.create({
                    data: {
                        name: args.name,
                        email: args.email,
                        password: args.password
                    }
                })
            }
        })
    }
})