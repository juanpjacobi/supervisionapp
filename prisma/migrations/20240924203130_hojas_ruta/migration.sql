-- CreateTable
CREATE TABLE "Prioridad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Prioridad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoLineaHojaRuta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoLineaHojaRuta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineaHojaRuta" (
    "id" SERIAL NOT NULL,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "tipoId" INTEGER NOT NULL,
    "prioridadId" INTEGER NOT NULL,
    "hojaRutaId" INTEGER NOT NULL,

    CONSTRAINT "LineaHojaRuta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HojaRuta" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HojaRuta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LineaHojaRuta" ADD CONSTRAINT "LineaHojaRuta_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoLineaHojaRuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaHojaRuta" ADD CONSTRAINT "LineaHojaRuta_prioridadId_fkey" FOREIGN KEY ("prioridadId") REFERENCES "Prioridad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaHojaRuta" ADD CONSTRAINT "LineaHojaRuta_hojaRutaId_fkey" FOREIGN KEY ("hojaRutaId") REFERENCES "HojaRuta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
