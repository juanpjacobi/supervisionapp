/*
  Warnings:

  - You are about to drop the `DirectivasSemanalas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DirectivasSemanalas" DROP CONSTRAINT "DirectivasSemanalas_edificioId_fkey";

-- DropForeignKey
ALTER TABLE "DirectivasSemanalas" DROP CONSTRAINT "DirectivasSemanalas_guardiaId_fkey";

-- DropForeignKey
ALTER TABLE "DirectivasSemanalas" DROP CONSTRAINT "DirectivasSemanalas_tipoId_fkey";

-- DropTable
DROP TABLE "DirectivasSemanalas";

-- CreateTable
CREATE TABLE "TareasPeriodicas" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "edificioId" INTEGER NOT NULL,
    "guardiaId" INTEGER NOT NULL,

    CONSTRAINT "TareasPeriodicas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TareasPeriodicas" ADD CONSTRAINT "TareasPeriodicas_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareasPeriodicas" ADD CONSTRAINT "TareasPeriodicas_guardiaId_fkey" FOREIGN KEY ("guardiaId") REFERENCES "Guardia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareasPeriodicas" ADD CONSTRAINT "TareasPeriodicas_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoLineaHojaRuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
