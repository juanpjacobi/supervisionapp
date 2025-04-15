-- CreateTable
CREATE TABLE "Novedad" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "hora" TEXT,
    "edificioId" INTEGER NOT NULL,
    "guardiaId" INTEGER NOT NULL,
    "hojaRutaId" INTEGER NOT NULL,

    CONSTRAINT "Novedad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Novedad" ADD CONSTRAINT "Novedad_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novedad" ADD CONSTRAINT "Novedad_guardiaId_fkey" FOREIGN KEY ("guardiaId") REFERENCES "Guardia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novedad" ADD CONSTRAINT "Novedad_hojaRutaId_fkey" FOREIGN KEY ("hojaRutaId") REFERENCES "HojaRuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
