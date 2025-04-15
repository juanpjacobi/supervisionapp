'use server'

import prisma from "@/app/lib/prisma";

export const getTareasPeriodicas = async () => {
  const periodicas = await prisma.tareasPeriodicas.findMany({
    include: {
        tipo: true,
        edificio: true,
        guardia: true
      },
  });
  return {
    ok: true,
    periodicas
  };
};