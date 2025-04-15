-- CreateTable
CREATE TABLE "Guardia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,

    CONSTRAINT "Guardia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guardia" ADD CONSTRAINT "Guardia_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
