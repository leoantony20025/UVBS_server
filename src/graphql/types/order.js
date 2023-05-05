import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { mailToOrderPlacement } from "../../../mail";

const prisma = new PrismaClient()

export const Order = objectType({
    name: "Order",
    definition(t) {
      t.string("id");
      t.field("user", {type: "User"}),
      t.string("line1");
      t.string("line2");
      t.string("city");
      t.string("state");
      t.string("country");
      t.int("zip");
      t.string("status");
      t.string("products");
      t.int("price");
      t.string("payment_mode");
      t.string("payment_status");
      t.string("razorpay_temp_order_id");
      t.string("razorpay_payment_id");
      t.string("razorpay_order_id");
      t.string("razorpay_signature");
      t.field("deliveryDate", { type: "DateTime" });
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });


  export const allOrders = extendType({
    type: "Query",
    definition(t) {
        t.list.field("allOrders", {
            type: "Order",
            async resolve(_root, args) {
                return await prisma.order.findMany()
            }
        })
    }
})

export const createCODOrder = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createCODOrder", {
            type: "User",
            args: {
                userId: nonNull(stringArg()),
                line1: nonNull(stringArg()),
                line2: nonNull(stringArg()),
                city: nonNull(stringArg()),
                state: nonNull(stringArg()),
                country: nonNull(stringArg()),
                zip: nonNull(intArg()),
                products: nonNull(stringArg()),
                price: nonNull(intArg()),
            },
            async resolve(_root, args) {
                let deliveryDate = new Date(Date.now() + 5 * 86400000)
                await prisma.order.create({
                    data: {
                        userId: args.userId,
                        line1: args.line1,
                        line2: args.line2,
                        city: args.city,
                        state: args.state,
                        country: args.country,
                        zip: args.zip,
                        products: args.products,
                        price: args.price,
                        payment_mode: "COD",
                        payment_status: "NP",
                        status: "PLACED",
                        deliveryDate
                    }
                })

                const user = await prisma.user.findUnique({
                    where: {
                        id: args.userId
                    }
                })

                mailToOrderPlacement(user?.email, user?.name)

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

