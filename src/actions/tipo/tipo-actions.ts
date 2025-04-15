'use server'

import prisma from "@/app/lib/prisma";

export const getTiposLineasHojaruta = async () => {
  const tipos = await prisma.tipoLineaHojaRuta.findMany({});
  return {
    ok: true,
    tipos
  };
};