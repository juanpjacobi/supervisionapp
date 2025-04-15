import NextAuth, { DefaultSession } from "next-auth"
 
declare module "next-auth" {

  interface Session {
    user: {
      id: string,
        nombre: string,
        email: string,
      rol: {
        id: number,
        nombreRol: string
      }
    } & DefaultSession["user"]
  }
}