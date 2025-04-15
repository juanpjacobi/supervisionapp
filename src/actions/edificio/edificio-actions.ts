"use server";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const getEdificios = async () => {
  try {
    const edificios = await prisma.edificio.findMany();
    return {
      ok: true,
      edificios,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener edificios");
  }
};

// Modificación en la acción getEdificio
export const getEdificio = async (id: number) => {
  try {
    const edificio = await prisma.edificio.findFirst({
      where: { id },
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
        administracion: {
          include: {
            direccion: true,
          },
        },
        // Asegúrate de que el nombre aquí coincida con tu esquema de Prisma
        DetalleEdificio: {  // Cambia "detalleEdificio" si tienes otro nombre en tu esquema
          include: {
            services: true,
            directivas: true,

          },

        },
      },
    });
    return {
      ok: true,
      edificio,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener edificio");
  }
};



const edificioSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  calle: z.string().min(1, "La calle es requerida"),
  numero: z.string().min(1, "El número es requerido"),
  barrioId: z.number().min(1, "El barrio es requerido"),
  administracionId: z.coerce.number().min(1, "La administracion es requerida"),
});

export const crearEdificio = async (data: {
  nombre: string;
  calle: string;
  numero: string;
  barrioId: number;
  administracionId: number;
}) => {
  const parsedEdificio = edificioSchema.safeParse(data);
  if (!parsedEdificio.success) {
    console.log(parsedEdificio.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = edificioSchema.parse(data);

    const result = await prisma.$transaction(async (tx) => {
      const direccion = await tx.direccion.create({
        data: {
          calle: parsedData.calle,
          numero: parsedData.numero,
          barrioId: parsedData.barrioId,
        },
      });

      const edificio = await tx.edificio.create({
        data: {
          nombre: parsedData.nombre,
          direccionId: direccion.id,
          administracionId: parsedData.administracionId,
        },
      });
    });

    return {
      ok: true,
      message: "Edificio creado con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear edificio");
  }
};
