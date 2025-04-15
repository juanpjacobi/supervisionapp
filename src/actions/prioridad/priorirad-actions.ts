"use server";

import prisma from "@/app/lib/prisma";

export const getPriorirades = async () => {
  const prioridades = await prisma.prioridad.findMany({});
  return {
    ok: true,
    prioridades,
  };
};
