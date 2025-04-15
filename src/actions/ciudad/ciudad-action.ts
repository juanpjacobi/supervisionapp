'use server'

import prisma from "@/app/lib/prisma";

export const getCiudades = async () => {
  const ciudades = await prisma.ciudad.findMany({});
  return ciudades;
};