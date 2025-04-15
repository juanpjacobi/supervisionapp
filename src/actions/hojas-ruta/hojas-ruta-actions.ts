"use server";
import prisma from "@/app/lib/prisma";
import { z } from "zod";

export const getHojas = async () => {
  try {
    const hojas = await prisma.hojaRuta.findMany({
      include: {
        LineaHojaRuta: {
          include: {
            tipo: true,
            prioridad: true,
          },
        },
        supervisor: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
        creador: {
          select: {
            nombre: true,
            email: true,
          },
        },
      },
    });
    return {
      ok: true,
      hojas,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener hojas de ruta");
  }
};

export const getHoja = async (id: number) => {
  try {
    const hoja = await prisma.hojaRuta.findFirst({
      where: {
        id,
      },

      include: {
        LineaHojaRuta: {
          orderBy: {
            hora: "asc",
          },
          include: {
            prioridad: true,
            tipo: true,
            edificio: {
              select: { nombre: true },
            },
            guardia: {
              select: { nombre: true },
            },
          },
        },
        Novedad: {
          orderBy: {
            hora: "asc",
          },
          include: {
            edificio: {
              select: { nombre: true },
            },
            guardia: {
              select: { nombre: true },
            },
          },
        },
        supervisor: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
        creador: {
          select: {
            nombre: true,
            email: true,
          },
        },
      },
    });
    return {
      ok: true,
      hoja,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener hoja");
  }
};

const hojaRutaschema = z.object({
  fecha: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return arg ? new Date(arg) : null;
    }
    return null;
  }, z.date()), // Aquí eliminamos `.nullable()` si no permites fechas nulas
  supervisorId: z.number(),
  creadorId: z.number(),
});

export const crearHojaDeRuta = async (data: {
  fecha: Date;
  supervisorId: number;
  creadorId: number;
}) => {
  const parsedhojaruta = hojaRutaschema.safeParse(data);
  if (!parsedhojaruta.success) {
    console.log(parsedhojaruta.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = hojaRutaschema.parse(data);
    const result = await prisma.hojaRuta.create({
      data: {
        fecha: parsedData.fecha,
        supervisorId: parsedData.supervisorId,
        creadorId: parsedData.creadorId,
      },
    });

    return {
      ok: true,
      message: "Hoja de ruta creada con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear hoja de ruta");
  }
};
