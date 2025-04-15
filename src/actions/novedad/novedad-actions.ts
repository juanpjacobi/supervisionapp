"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const novedadSchema = z.object({
  descripcion: z.string().min(1, "El nombre es requerido"),
  hojaRutaId: z.number().min(1, "La hoja de ruta es requerida"),
  guardiaId: z.number().min(1, "El guardia es requerido"),
  edificioId: z.number().min(1, "El edificio es requerido"),
});

export const crearNovedad = async (data: {
  descripcion: string;
  hora: string,
  guardiaId: number;
  edificioId: number;
  hojaRutaId: number;
}) => {
  const parsedNovedad = novedadSchema.safeParse(data);
  if (!parsedNovedad.success) {
    console.log(parsedNovedad.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = novedadSchema.parse(data);

    const result = await prisma.novedad.create({
      data: {
        descripcion: parsedData.descripcion,
        hora: data.hora,
        guardiaId: parsedData.guardiaId,
        edificioId: parsedData.edificioId,
        hojaRutaId: parsedData.hojaRutaId,
      },
    });

    revalidatePath(`http://localhost:3000/hojas/${parsedData.hojaRutaId}`);
    return {
      ok: true,
      message: "Novedad agregada con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear novedad");
  }
};