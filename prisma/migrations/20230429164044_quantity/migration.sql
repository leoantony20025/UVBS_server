-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
