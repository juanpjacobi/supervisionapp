/*
  Warnings:

  - Added the required column `descripcion` to the `LineaHojaRuta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edificioId` to the `LineaHojaRuta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardiaId` to the `LineaHojaRuta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LineaHojaRuta" ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "edificioId" INTEGER NOT NULL,
ADD COLUMN     "guardiaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LineaHojaRuta" ADD CONSTRAINT "LineaHojaRuta_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaHojaRuta" ADD CONSTRAINT "LineaHojaRuta_guardiaId_fkey" FOREIGN KEY ("guardiaId") REFERENCES "Guardia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
