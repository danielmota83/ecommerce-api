/*
  Warnings:

  - You are about to drop the column `orderDetails` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `customerScore` on the `product` table. All the data in the column will be lost.
  - Added the required column `paymentType` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `addressType` on the `user_address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('residential', 'comercial', 'relatives', 'neighbors', 'other');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('creditCard', 'invoice', 'directTransfer');

-- DropIndex
DROP INDEX "user_address_addressType_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "orderDetails",
ADD COLUMN     "paymentType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "customerScore";

-- AlterTable
ALTER TABLE "user_address" DROP COLUMN "addressType",
ADD COLUMN     "addressType" "AddressType" NOT NULL;
