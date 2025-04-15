'use server'

import prisma from "@/app/lib/prisma"

export const getRoles = async() => {

    try {
        const roles = await prisma.rol.findMany({});
        return {
            ok: true,
            roles
        }
        
    } catch (error) {
        throw error;
    }
}