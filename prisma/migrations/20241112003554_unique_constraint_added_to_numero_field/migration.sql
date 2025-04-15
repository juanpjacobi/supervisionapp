/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Guardia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guardia_numero_key" ON "Guardia"("numero");
