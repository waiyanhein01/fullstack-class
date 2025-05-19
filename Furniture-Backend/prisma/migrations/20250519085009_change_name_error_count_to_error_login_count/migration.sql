/*
  Warnings:

  - You are about to drop the column `errorCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "errorCount",
ADD COLUMN     "errorLoginCount" SMALLINT NOT NULL DEFAULT 0;
