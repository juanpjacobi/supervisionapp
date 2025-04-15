-- AlterTable
ALTER TABLE "Administracion" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Edificio" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Guardia" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;
