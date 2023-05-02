/*
  Warnings:

  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `products` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_userId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "products" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrderProduct";
