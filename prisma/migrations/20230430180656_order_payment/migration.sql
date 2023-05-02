/*
  Warnings:

  - Added the required column `payment_mode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_mode" TEXT NOT NULL,
ADD COLUMN     "payment_status" TEXT NOT NULL,
ADD COLUMN     "razorpay_order_id" TEXT,
ADD COLUMN     "razorpay_payment_id" TEXT,
ADD COLUMN     "razorpay_signature" TEXT,
ADD COLUMN     "razorpay_temp_order_id" TEXT;
