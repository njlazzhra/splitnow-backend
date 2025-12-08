/*
  Warnings:

  - The `event_date` column on the `kegiatan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "kegiatan" DROP COLUMN "event_date",
ADD COLUMN     "event_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
