/*
  Warnings:

  - You are about to drop the column `service` on the `DetalleEdificio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetalleEdificio" DROP COLUMN "service";

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "nombreService" TEXT NOT NULL,
    "descripcion" TEXT,
    "telefono" TEXT,
    "email" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DetalleEdificioServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DetalleEdificioServices_AB_unique" ON "_DetalleEdificioServices"("A", "B");

-- CreateIndex
CREATE INDEX "_DetalleEdificioServices_B_index" ON "_DetalleEdificioServices"("B");

-- AddForeignKey
ALTER TABLE "_DetalleEdificioServices" ADD CONSTRAINT "_DetalleEdificioServices_A_fkey" FOREIGN KEY ("A") REFERENCES "DetalleEdificio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetalleEdificioServices" ADD CONSTRAINT "_DetalleEdificioServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
