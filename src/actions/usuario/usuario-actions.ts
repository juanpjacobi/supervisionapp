"use server";

import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import bcryptjs from 'bcryptjs';
import { revalidatePath } from "next/cache";

export const getUsuarios = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
      activo: true
    },
    orderBy: { id: "asc" },
  });
  return {
    ok: true,
    users,
  };
};

const usuarioSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "El password es requerido"),
  rolId: z.coerce.number().min(1, "El rol es requerida"),
});

export const crearUsuario = async (data: {
  nombre: string;
  email: string;
  password: string;
  rolId: number;
}) => {
  const parsedUsuario = usuarioSchema.safeParse(data);
  
  if (!parsedUsuario.success) {
    console.log(parsedUsuario.error);
    return {
      ok: false,
    };
  }

  try {
    const parsedData = usuarioSchema.parse(data);
    const usuario = await prisma.user.create({
      data: {
        nombre: parsedData.nombre,
        email: parsedData.email,
        password: bcryptjs.hashSync(parsedData.password),
        rolId: parsedData.rolId,
      },
    });

    return {
      ok: true,
      message: "Usuario creada con éxito",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          ok: false,
          message: "Ya existe un usuario con ese email",
        };
      }
    }
    throw error;
  }
};

