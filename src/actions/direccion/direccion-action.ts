'use server'

import prisma from "@/app/lib/prisma";

// actions.ts
export const getDirecciones = async () => {
    try {
      const ciudades = await prisma.ciudad.findMany({
        include: {
          Localidad: {
            include: {
              Barrio: true,
            },
          },
        },
      });
      console.log("Ciudades con localidades:", JSON.stringify(ciudades, null, 2));
      return ciudades;
    } catch (error) {
      console.error("Error al obtener direcciones:", error);
      throw new Error("Error al obtener direcciones");
    }
  };
  