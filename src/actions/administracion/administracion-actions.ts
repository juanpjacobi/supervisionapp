"use server";
import prisma from "@/app/lib/prisma";
import { Administracion, Prisma } from "@prisma/client";
import { z } from "zod";

export async function getAdministraciones():Promise<Administracion[]> {
  try {
    const administraciones = await prisma.administracion.findMany({
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
        Edificio: true,
      },
    });
    return administraciones;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener administraciones");
  }
}


export async function getAdministracion(id: number) {
  try {
    const administracion = await prisma.administracion.findFirst({
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
        Edificio: {
          include: {
            direccion: true,
          },
        },
      },
    });
    return {
      ok: true,
      administracion,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error al obtener administracion con el id: ${id}`);
  }
}

const administracionSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  calle: z.string().min(1, "La calle es requerida"),
  numero: z.string().min(1, "El número es requerido"),
  barrioId: z.number().min(1, "El barrio es requerido"),
});

export const crearAdministracion = async (data: {
  nombre: string;
  email: string;
  telefono: string;
  calle: string;
  numero: string;
  barrioId: number;
}) => {
  const parsedAdministracion = administracionSchema.safeParse(data);
  if (!parsedAdministracion.success) {
    console.log(parsedAdministracion.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = administracionSchema.parse(data);

    const result = await prisma.$transaction(async (tx) => {
      const direccion = await tx.direccion.create({
        data: {
          calle: parsedData.calle,
          numero: parsedData.numero,
          barrioId: parsedData.barrioId,
        },
      });

      const administracion = await tx.administracion.create({
        data: {
          nombre: parsedData.nombre,
          email: parsedData.email,
          telefono: parsedData.telefono,
          direccionId: direccion.id,
        },
      });
    });

    return {
      ok: true,
      message: "Administración creada con éxito",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          message: "Ya existe una administracion con ese email",
        };
      }
    }
    throw error;
  }
};
