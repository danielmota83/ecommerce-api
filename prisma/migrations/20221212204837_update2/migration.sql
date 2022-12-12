/*
  Warnings:

  - Changed the type of `addressType` on the `user_address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_address" DROP COLUMN "addressType",
ADD COLUMN     "addressType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AddressType";

-- DropEnum
DROP TYPE "PaymentType";
