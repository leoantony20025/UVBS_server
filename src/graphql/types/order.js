import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { mailToOrderPlacement } from "../../../mail/index.js";
import Razorpay from "razorpay";
import { uuid } from "uuidv4";
import crypto from 'crypto'

const prisma = new PrismaClient()

const key_secret = process.env.RAZORPAY_SECRET_KEY;

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret,
  });

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

  export const RPOrder = objectType({
    name: "RPOrder",
    definition(t) {
      t.string("id");
      t.string("entity");
      t.int("amount");
      t.int("amount_paid");
      t.int("amount_due");
      t.string("currency");
      t.string("receipt");
      t.string("offer_id");
      t.string("status");
      t.int("attempts");
      t.field("created_at", { type: "DateTime" });
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
                let order = await prisma.order.create({
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

                mailToOrderPlacement(user?.email, user?.name, order)


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

export const generateRPOrderId = extendType({
    type: "Mutation",
    definition(t) {
        t.field("generateRPOrderId", {
            type: "RPOrder",
            args: {
                price: nonNull(intArg()),
            },
            async resolve(_root, args) {
                let order = await instance.orders.create({
                    amount: args.price,
                    currency: "INR",
                    receipt: uuid(),
                  })

                  return order
                
            }
        })
    }
})

export const createRPOrder = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createRPOrder", {
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
                razorpay_temp_order_id: nonNull(stringArg()),
                razorpay_payment_id: nonNull(stringArg()),
                razorpay_order_id: nonNull(stringArg()),
                razorpay_signature: nonNull(stringArg()),
            },
            async resolve(_root, args) {
                let deliveryDate = new Date(Date.now() + 5 * 86400000)

                // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);
                let hmac = crypto.createHmac('sha256', key_secret); 
  
                // Passing the data to be hashed
                hmac.update(args.razorpay_temp_order_id + "|" + args.razorpay_payment_id);
                
                // Creating the hmac in the required format
                const generated_signature = hmac.digest('hex');

                if (generated_signature == args.razorpay_signature) {
                    let order = await prisma.order.create({
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
                            payment_mode: "RP",
                            payment_status: "P",
                            status: "PLACED",
                            razorpay_temp_order_id: args.razorpay_temp_order_id,
                            razorpay_payment_id: args.razorpay_payment_id,
                            razorpay_order_id: args.razorpay_order_id,
                            razorpay_signature: args.razorpay_signature,
                            deliveryDate
                        }
                    })
    
                    const user = await prisma.user.findUnique({
                        where: {
                            id: args.userId
                        }
                    })

                    console.log("");
    
                    mailToOrderPlacement(user?.email, user?.name, order)
    
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
                } else {
                    console.log("SIGNATURE FAILED");
                }

                
            }
        })
    }
})
