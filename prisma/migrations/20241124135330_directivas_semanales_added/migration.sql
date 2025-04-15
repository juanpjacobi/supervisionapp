-- CreateTable
CREATE TABLE "DirectivasSemanalas" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "edificioId" INTEGER NOT NULL,
    "guardiaId" INTEGER NOT NULL,

    CONSTRAINT "DirectivasSemanalas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DirectivasSemanalas" ADD CONSTRAINT "DirectivasSemanalas_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectivasSemanalas" ADD CONSTRAINT "DirectivasSemanalas_guardiaId_fkey" FOREIGN KEY ("guardiaId") REFERENCES "Guardia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectivasSemanalas" ADD CONSTRAINT "DirectivasSemanalas_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoLineaHojaRuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
