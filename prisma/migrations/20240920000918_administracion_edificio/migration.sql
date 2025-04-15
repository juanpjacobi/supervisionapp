-- CreateTable
CREATE TABLE "Administracion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,

    CONSTRAINT "Administracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edificio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,
    "administracionId" INTEGER NOT NULL,

    CONSTRAINT "Edificio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administracion_email_key" ON "Administracion"("email");

-- AddForeignKey
ALTER TABLE "Administracion" ADD CONSTRAINT "Administracion_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edificio" ADD CONSTRAINT "Edificio_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edificio" ADD CONSTRAINT "Edificio_administracionId_fkey" FOREIGN KEY ("administracionId") REFERENCES "Administracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
