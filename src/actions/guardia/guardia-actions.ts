"use server";
import prisma from "@/app/lib/prisma";
import { z } from "zod";

export const getGuardias = async () => {
  try {
    const guardias = await prisma.guardia.findMany();
    return {
      ok: true,
      guardias,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener guardias");
  }
};

export const getGuardia = async (id: number) => {
  try {
    const guardia = await prisma.guardia.findFirst({
      where: {
        id,
      },

      include: {
        direccion: {
          include: {
            barrio: {
              include: {
                localidad: {
                  include: {
                    ciudad: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      ok: true,
      guardia,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener edificio");
  }
};

const guardiaSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  dni: z.string().min(1, "El apellido es requerido"),
  calle: z.string().min(1, "La calle es requerida"),
  numero: z.string().min(1, "El número es requerido"),
  barrioId: z.number().min(1, "El barrio es requerido"),
});

export const crearGuardia = async (data: {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  calle: string;
  numero: string;
  barrioId: number;
}) => {
  const parsedGuardia = guardiaSchema.safeParse(data);
  if (!parsedGuardia.success) {
    console.log(parsedGuardia.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = guardiaSchema.parse(data);

    const result = await prisma.$transaction(async (tx) => {
      const direccion = await tx.direccion.create({
        data: {
          calle: parsedData.calle,
          numero: parsedData.numero,
          barrioId: parsedData.barrioId,
        },
      });

      const guardia = await tx.guardia.create({
        data: {
          nombre: parsedData.nombre,
          apellido: parsedData.apellido,
          telefono: parsedData.telefono,
          dni: parsedData.dni,
          direccionId: direccion.id,
        },
      });
    });

    return {
      ok: true,
      message: "Guardia creado con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear guardia");
  }
};
