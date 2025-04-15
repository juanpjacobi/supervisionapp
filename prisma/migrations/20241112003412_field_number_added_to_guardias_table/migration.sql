/*
  Warnings:

  - Added the required column `numero` to the `Guardia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guardia" ADD COLUMN     "numero" INTEGER NOT NULL;
