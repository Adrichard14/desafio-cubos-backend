/*
  Warnings:

  - The `runtime` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `release_date` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "runtime",
ADD COLUMN     "runtime" INTEGER,
DROP COLUMN "release_date",
ADD COLUMN     "release_date" TIMESTAMP(3);
