-- CreateTable
CREATE TABLE "Shipping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipping_userId_key" ON "Shipping"("userId");

-- AddForeignKey
ALTER TABLE "Shipping" ADD CONSTRAINT "Shipping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
