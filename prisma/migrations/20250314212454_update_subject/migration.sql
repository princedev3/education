/*
  Warnings:

  - Added the required column `desc` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL;
