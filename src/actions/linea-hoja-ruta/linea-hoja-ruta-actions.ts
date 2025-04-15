"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const lineaHojarutaSchema = z.object({
  descripcion: z.string().min(1, "El nombre es requerido"),


  hojaRutaId: z.number().min(1, "La hoja de ruta es requerida"),
  tipoId: z.number().min(1, "El tipo es requerido"),
  prioridadId: z.number().min(1, "La prioridad es requerida"),
  guardiaId: z.number().min(1, "El guardia es requerido"),
  edificioId: z.number().min(1, "El edificio es requerido"),
});

export const crearLineahojaruta = async (data: {
  descripcion: string;
  hora: string,
  tipoId: number;
  prioridadId: number;
  guardiaId: number;
  edificioId: number;
  hojaRutaId: number;
}) => {
  const parsedLinea = lineaHojarutaSchema.safeParse(data);
  if (!parsedLinea.success) {
    console.log(parsedLinea.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = lineaHojarutaSchema.parse(data);

    const result = await prisma.lineaHojaRuta.create({
      data: {
        descripcion: parsedData.descripcion,
        hora: data.hora,
        tipoId: parsedData.tipoId,
        prioridadId: parsedData.prioridadId,
        guardiaId: parsedData.guardiaId,
        edificioId: parsedData.edificioId,
        hojaRutaId: parsedData.hojaRutaId,
      },
    });

    revalidatePath(`http://localhost:3000/hojas/${parsedData.hojaRutaId}`);
    return {
      ok: true,
      message: "Tarea agregada con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear tarea");
  }
};


export const togleCompleted = async (id: number, completada: boolean, hojaRutaId: number) => {
  const linea = await prisma.lineaHojaRuta.findFirst({ where: { id } });
  if (!linea) throw `No existe un todo con el id ${id}`;


  try {

    const updateTodo = await prisma.lineaHojaRuta.update({
      where: { id },
      data: { completada },
    });

  

    revalidatePath(`http://localhost:3000/hojas/${hojaRutaId}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear linea");
  }
};


