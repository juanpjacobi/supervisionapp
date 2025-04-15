'use server'

import prisma from "@/app/lib/prisma";

export const getLocalidades = async () => {
    const localidades = await prisma.localidad.findMany({});
    return localidades;
  };
  