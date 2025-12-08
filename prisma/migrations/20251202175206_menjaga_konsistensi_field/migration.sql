/*
  Warnings:

  - You are about to drop the column `userId` on the `kegiatan` table. All the data in the column will be lost.
  - Added the required column `username` to the `kegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "kegiatan" DROP CONSTRAINT "kegiatan_userId_fkey";

-- AlterTable
ALTER TABLE "kegiatan" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
