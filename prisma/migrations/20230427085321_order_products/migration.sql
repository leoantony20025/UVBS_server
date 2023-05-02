/*
  Warnings:

  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line1` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line2` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "line1" TEXT NOT NULL,
ADD COLUMN     "line2" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" INTEGER;

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
