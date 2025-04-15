/*
  Warnings:

  - Added the required column `hora` to the `LineaHojaRuta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LineaHojaRuta" ADD COLUMN     "hora" TEXT NOT NULL;
