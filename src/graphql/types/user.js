import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";


const prisma = new PrismaClient();


export const User = objectType({
    name: "User",
    definition(t) {
      t.string("id");
      t.string("name");
      t.string("email");
      t.string("phone");
      t.string("password");
      t.field("cart", {type: "Cart"}),
      t.list.field("orders", {type: "Order"}),
      t.field("shipping", {type: "Shipping"}),
      t.boolean("isActive");
      t.boolean("isSubscribed");
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
                return await prisma.user.findMany({
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

export const signup = extendType({
    type: "Mutation",
    definition(t) {
        t.field("signup", {
            type: "User",
            args: {
                email: nonNull(stringArg()),
                name: nonNull(stringArg()),
                password: nonNull(stringArg()),
                phone: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: args.email
                    }
                })

                if (existingUser) {
                    if (existingUser?.isActive === false) {
                        return await prisma.user.update({
                            where: {
                                id: existingUser?.id
                            },
                            data: {
                                isActive: true,
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
                    else return new GraphQLError("Email already exists!")
                }
                else {
                    
                    var user = await prisma.user.create({
                        data: {
                            name: args.name,
                            email: args.email,
                            phone: args.phone,
                            password: args.password
                        }
                    })

                    await prisma.cart.create({
                        data: {
                            userId: user?.id,
                            price: 0
                        }
                    })

                    return await prisma.user.findUnique({
                        where: {
                            id: user?.id
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
                
            }
        })
    }
})


export const login = extendType({
    type: "Mutation",
    definition(t) {
        t.field("login", {
            type: "User",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                const user = await prisma.user.findUniqueOrThrow({
                    where: {
                        email: args.email
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

                if (user?.isActive === false) {
                    return new GraphQLError("No user found!")
                }

                if (user?.password !== args.password) {
                    return new GraphQLError("Invalid credentials!")
                }

                if (user?.password === args.password) {
                    return user
                }
            }
        })
    }
})

export const updateUser = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateUser", {
            type: "User",
            args: {
                id: nonNull(stringArg()),
                email: nonNull(stringArg()),
                name: nonNull(stringArg()),
                password: nonNull(stringArg()),
                phone: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                var user = await prisma.user.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        name: args.name,
                        email: args.email,
                        password: args.password,
                        phone: args.phone
                    }
                })

                return await prisma.user.findUnique({
                    where: {
                        id: user?.id
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

export const updateUserSubscription = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateUserSubscription", {
            type: "User",
            args: {
                id: nonNull(stringArg()),
                isSubscribed: nonNull(booleanArg()),
            },
            async resolve(_root, args) {
                var user = await prisma.user.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        isSubscribed: args.isSubscribed,
                    }
                })

                return await prisma.user.findUnique({
                    where: {
                        id: user?.id
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


export const deleteUser = extendType({
    type: "Mutation",
    definition(t) {
        t.field("deleteUser", {
            type: "User",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                var user = await prisma.user.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        isActive: false
                    }
                })
                return user
            }
        })
    }
})