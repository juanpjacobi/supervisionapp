'use server'
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

type ModelName = "user" | "edificio" | "administracion" | "guardia";


export async function toggleActivo(model: ModelName, id: number) {
  try {
    let existingRecord;
    let updatedRecord;

    switch (model) {
      case "user":
        existingRecord = await prisma.user.findUnique({
          where: { id },
          select: { activo: true }
        });
        revalidatePath(`http://localhost:3000/usuarios}`);

        if (!existingRecord) throw new Error("Usuario no encontrado");
        updatedRecord = await prisma.user.update({
          where: { id },
          data: { activo: !existingRecord.activo }
        });
        break;

      case "edificio":
        existingRecord = await prisma.edificio.findUnique({
          where: { id },
          select: { activo: true }
        });
        if (!existingRecord) throw new Error("Edificio no encontrado");
        updatedRecord = await prisma.edificio.update({
          where: { id },
          data: { activo: !existingRecord.activo }
        });
        break;

      case "administracion":
        existingRecord = await prisma.administracion.findUnique({
          where: { id },
          select: { activo: true }
        });
        if (!existingRecord) throw new Error("Administración no encontrada");
        updatedRecord = await prisma.administracion.update({
          where: { id },
          data: { activo: !existingRecord.activo }
        });
        break;

      case "guardia":
        existingRecord = await prisma.guardia.findUnique({
          where: { id },
          select: { activo: true }
        });
        if (!existingRecord) throw new Error("Guardia no encontrado");
        updatedRecord = await prisma.guardia.update({
          where: { id },
          data: { activo: !existingRecord.activo }
        });
        break;

      default:
        throw new Error("Modelo no válido");
    }

    return updatedRecord;
  } catch (error) {
    console.error("Error al alternar el estado de activo:", error);
    throw new Error("No se pudo alternar el estado de activo. Verifica los parámetros proporcionados.");
  }
}
