/*
  Warnings:

  - The primary key for the `Call` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Call` table. All the data in the column will be lost.
  - Added the required column `callId` to the `Call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Call" DROP CONSTRAINT "Call_pkey",
DROP COLUMN "id",
ADD COLUMN     "callId" TEXT NOT NULL,
ADD CONSTRAINT "Call_pkey" PRIMARY KEY ("callId");
