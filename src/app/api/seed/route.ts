import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET() {
  try {
    // Eliminar todos los datos existentes
    await prisma.lineaHojaRuta.deleteMany();
    await prisma.tareasPeriodicas.deleteMany();
    await prisma.novedad.deleteMany();
    await prisma.hojaRuta.deleteMany();
    await prisma.guardia.deleteMany();
    await prisma.rol.deleteMany();
    await prisma.user.deleteMany();
    await prisma.prioridad.deleteMany();
    await prisma.tipoLineaHojaRuta.deleteMany();
    await prisma.directivaEdificio.deleteMany();
    await prisma.detalleEdificio.deleteMany();
    await prisma.edificio.deleteMany();
    await prisma.administracion.deleteMany();
    await prisma.direccion.deleteMany();
    await prisma.barrio.deleteMany();
    await prisma.localidad.deleteMany();
    await prisma.ciudad.deleteMany();

    // Crear ciudades, localidades y barrios
    const ciudad1 = await prisma.ciudad.create({
      data: {
        nombreCiudad: "Ciudad Ejemplo 1",
        Localidad: {
          create: [
            {
              nombreLocalidad: "Localidad Ejemplo 1",
              Barrio: {
                create: {
                  nombreBarrio: "Barrio Ejemplo 1",
                },
              },
            },
          ],
        },
      },
    });

    const ciudad2 = await prisma.ciudad.create({
      data: {
        nombreCiudad: "Ciudad Ejemplo 2",
        Localidad: {
          create: [
            {
              nombreLocalidad: "Localidad Ejemplo 2",
              Barrio: {
                create: {
                  nombreBarrio: "Barrio Ejemplo 2",
                },
              },
            },
          ],
        },
      },
    });

    // Crear direcciones
    const direccion1 = await prisma.direccion.create({
      data: {
        calle: "Calle Falsa",
        numero: "123",
        barrioId: (await prisma.barrio.findFirst({
          where: { nombreBarrio: "Barrio Ejemplo 1" },
        }))!.id,
      },
    });

    const direccion2 = await prisma.direccion.create({
      data: {
        calle: "Avenida Siempre Viva",
        numero: "742",
        barrioId: (await prisma.barrio.findFirst({
          where: { nombreBarrio: "Barrio Ejemplo 2" },
        }))!.id,
      },
    });

    // Crear administraciones y edificios
    const administracion1 = await prisma.administracion.create({
      data: {
        nombre: "Administracion 1",
        email: "admin1@example.com",
        telefono: "123456789",
        direccionId: direccion1.id,
      },
    });

    const administracion2 = await prisma.administracion.create({
      data: {
        nombre: "Administracion 2",
        email: "admin2@example.com",
        telefono: "987654321",
        direccionId: direccion2.id,
      },
    });

    const edificio1 = await prisma.edificio.create({
      data: {
        nombre: "Edificio Ejemplo 1",
        direccionId: direccion1.id,
        administracionId: administracion1.id,
      },
    });

    const edificio2 = await prisma.edificio.create({
      data: {
        nombre: "Edificio Ejemplo 2",
        direccionId: direccion2.id,
        administracionId: administracion2.id,
      },
    });

    const service1 = await prisma.service.create({
      data: {
        nombreService: "Mantenimiento General",
        descripcion:
          "Servicio de mantenimiento preventivo y correctivo semanal.",
        telefono: "123456789",
        email: "mantenimiento@example.com",
      },
    });

    const service2 = await prisma.service.create({
      data: {
        nombreService: "Servicio de Limpieza",
        descripcion: "Limpieza de áreas comunes y espacios de alto tránsito.",
        telefono: "987654321",
        email: "limpieza@example.com",
      },
    });

    const detalleEdificio1 = await prisma.detalleEdificio.create({
      data: {
        modalidadServicio: "Sab de 12:00 a 08:00 Hs, Dom de 08:00 a 06:00 Hs",
        llaves: "En Base",
        banio: "Planta Baja Primer Puerta a la Izquierda",
        sotano: "Detrás Puerta Sotano",
        tableros:
          "En Tablero Eléctrico, se apaga con tercer térmica a la altura de la alarma",
        bombas: "Sótano",
        sisterna: null,
        terraza: null,
        cochera: null,
        services: {
          connect: [{ id: service1.id }, { id: service2.id }],
        },
        anotaciones:
          "Durante los recorridos, y al finalizar el servicio, el cuarto de encargado deberá permanecer cerrado con llave y la silla dentro del mismo.",
        alarma: "Alarma en el sótano",
        edificioId: edificio1.id,
      },
    });

    const detalleEdificio2 = await prisma.detalleEdificio.create({
      data: {
        modalidadServicio: "Lun a Vie de 08:00 a 18:00 Hs",
        llaves: "Conserjería",
        banio: "Segundo Piso",
        sotano: "Subsuelo",
        tableros: "Tablero principal en el hall",
        bombas: "Cuarto de máquinas",
        sisterna: "En la terraza",
        terraza: "Con acceso restringido",
        cochera: "Sótano",
        services: {
          connect: [{ id: service1.id }],
        },
        anotaciones:
          "Verificar el buen estado de las instalaciones cada semana.",
        alarma: "Activar alarma de seguridad al finalizar la jornada",
        edificioId: edificio2.id,
      },
    });

    // Crear directivas para cada detalle de edificio
    await prisma.directivaEdificio.createMany({
      data: [
        {
          contenido: "Realizar inspección diaria de entrada y salida",
          detalleEdificioId: detalleEdificio1.id,
        },
        {
          contenido: "Revisar el estado de las llaves cada semana",
          detalleEdificioId: detalleEdificio1.id,
        },
        {
          contenido: "Mantener áreas comunes limpias",
          detalleEdificioId: detalleEdificio2.id,
        },
        {
          contenido: "Inspección de seguridad cada dos horas",
          detalleEdificioId: detalleEdificio2.id,
        },
      ],
    });

    // Crear roles

    const rol1 = await prisma.rol.create({
      data: {
        nombreRol: "Root",
      },
    });
    const rol2 = await prisma.rol.create({
      data: {
        nombreRol: "Admin",
      },
    });
    const rol3 = await prisma.rol.create({
      data: {
        nombreRol: "Supervisor",
      },
    });
    const rol4 = await prisma.rol.create({
      data: {
        nombreRol: "User",
      },
    });

    // Crear usuarios
    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        password: bcryptjs.hashSync("password1"),
        nombre: "Usuario Uno",
        rolId: rol1.id,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        password: bcryptjs.hashSync("password2"),
        nombre: "Usuario Dos",
        rolId: rol2.id,
      },
    });
    const user3 = await prisma.user.create({
      data: {
        email: "user3@example.com",
        password: bcryptjs.hashSync("password3"),
        nombre: "Usuario Dos",
        rolId: rol3.id,
      },
    });
    const user4 = await prisma.user.create({
      data: {
        email: "user4@example.com",
        password: bcryptjs.hashSync("password4"),
        nombre: "Usuario Dos",
        rolId: rol4.id,
      },
    });

    // Crear guardias
    const guardia1 = await prisma.guardia.create({
      data: {
        nombre: "Guardia Uno",
        numero: 2464,
        apellido: "Perez",
        dni: "12345678",
        telefono: "1111111",
        direccionId: direccion1.id,
      },
    });

    const guardia2 = await prisma.guardia.create({
      data: {
        nombre: "Guardia Dos",
        numero: 2728,
        apellido: "Lopez",
        dni: "87654321",
        telefono: "2222222",
        direccionId: direccion2.id,
      },
    });

    // Crear prioridades
    const prioridadAlta = await prisma.prioridad.create({
      data: { nombre: "Alta" },
    });
    const prioridadMedia = await prisma.prioridad.create({
      data: { nombre: "Media" },
    });
    const prioridadBaja = await prisma.prioridad.create({
      data: { nombre: "Baja" },
    });

    // Crear tipos de línea de hoja de ruta
    const tipoInspeccion = await prisma.tipoLineaHojaRuta.create({
      data: { nombre: "Inspección" },
    });
    const tipoLimpieza = await prisma.tipoLineaHojaRuta.create({
      data: { nombre: "Limpieza" },
    });
    const tipoSeguridad = await prisma.tipoLineaHojaRuta.create({
      data: { nombre: "Seguridad" },
    });

    // Crear hojas de ruta
    const hojaRuta1 = await prisma.hojaRuta.create({
      data: {
        fecha: new Date(),
        supervisorId: guardia1.id,
        creadorId: user1.id,
      },
    });

    const hojaRuta2 = await prisma.hojaRuta.create({
      data: {
        fecha: new Date(),
        supervisorId: guardia2.id,
        creadorId: user2.id,
      },
    });

    // Crear líneas de hoja de ruta con los nuevos campos
    await prisma.lineaHojaRuta.create({
      data: {
        descripcion: "Inspección del Edificio Ejemplo 1",
        hora: "21:30",
        tipoId: tipoInspeccion.id,
        prioridadId: prioridadAlta.id,
        hojaRutaId: hojaRuta1.id,
        guardiaId: guardia1.id,
        edificioId: edificio1.id,
        completada: false,
      },
    });

    await prisma.lineaHojaRuta.create({
      data: {
        descripcion: "Limpieza del Edificio Ejemplo 2",
        hora: "22:30",
        tipoId: tipoLimpieza.id,
        prioridadId: prioridadMedia.id,
        hojaRutaId: hojaRuta2.id,
        guardiaId: guardia2.id,
        edificioId: edificio2.id,
        completada: true,
      },
    });

    await prisma.novedad.create({
      data: {
        descripcion: "Se lo encuenra dormido",
        hora: "21:30",
        hojaRutaId: hojaRuta1.id,
        guardiaId: guardia1.id,
        edificioId: edificio1.id,
      },
    });
    await prisma.novedad.create({
      data: {
        descripcion: "Se reportan ruidos molestos, me dirijo a revisar",
        hora: "21:30",
        hojaRutaId: hojaRuta2.id,
        guardiaId: guardia2.id,
        edificioId: edificio2.id,
      },
    });
    await prisma.tareasPeriodicas.create({
      data: {
        descripcion: "Revisar cocheras",
        tipoId: tipoLimpieza.id,
        guardiaId: guardia2.id,
        edificioId: edificio2.id,
      },
    });
    await prisma.tareasPeriodicas.create({
      data: {
        descripcion: "Retirar informes",
        tipoId: tipoLimpieza.id,
        guardiaId: guardia1.id,
        edificioId: edificio1.id,
      },
    });

    return NextResponse.json({
      msg: "Seed executed successfully",
    });
  } catch (error) {
    console.error("Error executing seed: ", error);
    return NextResponse.json({ error: "Error executing seed" });
  }
}

