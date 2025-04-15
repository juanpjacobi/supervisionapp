-- CreateTable
CREATE TABLE "DetalleEdificio" (
    "id" SERIAL NOT NULL,
    "modalidadServicio" TEXT,
    "llaves" TEXT,
    "banio" TEXT,
    "sotano" TEXT,
    "tableros" TEXT,
    "bombas" TEXT,
    "sisterna" TEXT,
    "terraza" TEXT,
    "cochera" TEXT,
    "service" TEXT,
    "anotaciones" TEXT,
    "alarma" TEXT,
    "edificioId" INTEGER NOT NULL,

    CONSTRAINT "DetalleEdificio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectivaEdificio" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "detalleEdificioId" INTEGER NOT NULL,

    CONSTRAINT "DirectivaEdificio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetalleEdificio_edificioId_key" ON "DetalleEdificio"("edificioId");

-- AddForeignKey
ALTER TABLE "DetalleEdificio" ADD CONSTRAINT "DetalleEdificio_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectivaEdificio" ADD CONSTRAINT "DirectivaEdificio_detalleEdificioId_fkey" FOREIGN KEY ("detalleEdificioId") REFERENCES "DetalleEdificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
