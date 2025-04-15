import Link from "next/link";
import { getAdministraciones } from "@/actions";
import { ButtonWithPath, Table } from "@/components";
import { IoInformationOutline } from "react-icons/io5";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default async function AdministracionesPage() {
  const administraciones = await getAdministraciones();

  const columns = [
    { header: "#", key: "index" },
    { header: "Nombre", key: "nombre" },
    { header: "Email", key: "email" },
    { header: "Telefono", key: "telefono" },
    { header: "Estado", key: "estado" },

    { header: "Acciones", key: "actions" },
  ];

  const data = administraciones.map((admin, index) => ({
    index: index + 1,
    nombre: admin.nombre,
    email: admin.email,
    telefono: admin.telefono,
    estado: admin.activo ? "Activo" : "Inactivo",
    actions: (
      <Link
        className="text-sky-600 hover:text-cyan-600 flex justify-center"
        href={`/administraciones/${admin.id}`}
      >
        <BsFillInfoSquareFill size={25} />
      </Link>
    ),
  }));

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <ButtonWithPath path="/administraciones/new" title="Crear nuevo" />
      </div>
      <Table columns={columns} data={data} title="Administraciones" />
    </div>
  );
}
