'use server'

import prisma from "@/app/lib/prisma";

export const getBarrios = async () => {
    const barrios = await prisma.barrio.findMany({});
    return barrios;
  };