import { PrismaClient } from "@prisma/client";
import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient()

export const OrderProduct = objectType({
    name: "OrderProduct",
    definition(t) {
      t.string("id");
      t.field("user", {type: "User"}),
      t.string("userId");
      t.field("product", {type: "Product"}),
      t.string("productId");
      t.field("order", {type: "Order"}),
      t.string("orderId");
      t.int("quantity");
      t.field("createdAt", { type: "DateTime" });
      t.field("updatedAt", { type: "DateTime" });
    },
  });