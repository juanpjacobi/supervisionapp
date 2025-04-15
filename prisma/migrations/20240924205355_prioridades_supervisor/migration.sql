/*
  Warnings:

  - Added the required column `creadorId` to the `HojaRuta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `HojaRuta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HojaRuta" ADD COLUMN     "creadorId" INTEGER NOT NULL,
ADD COLUMN     "supervisorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HojaRuta" ADD CONSTRAINT "HojaRuta_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Guardia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HojaRuta" ADD CONSTRAINT "HojaRuta_creadorId_fkey" FOREIGN KEY ("creadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
