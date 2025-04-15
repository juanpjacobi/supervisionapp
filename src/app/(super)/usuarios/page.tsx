import { getUsuarios } from "@/actions";
import { ButtonWithPath, Table } from "@/components";
import ToggleActiveButton from "@/components/shared/toggle-button/ToggleButton";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export default async function UsuariosPage() {
  const { users } = await getUsuarios();
  const columns = [
    { header: "#", key: "index" },
    { header: "Nombre", key: "nombre" },
    { header: "Email", key: "email" },
    { header: "Rol", key: "rol" },
    { header: "Estado", key: "estado" },
    { header: "Acciones", key: "actions" },
  ];

  const data = users.map((user, index) => ({
    index: index + 1,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol.nombreRol,
    estado: user.activo ? 'Activo' : 'Inactivo',

    actions: (
      <div className="flex gap-2 justify-center">
        <Link
          className="text-blue-500 hover:underline"
          href={`/administraciones/${user.id}`}
        >
          <FaEdit size={25} />
        </Link>
        <ToggleActiveButton model="user" id={user.id} /> 

      </div>
    ),
  }));

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <ButtonWithPath path="/usuarios/new" title="Crear nuevo" />
      </div>
      <Table columns={columns} data={data} title="Usuarios" />
    </div>
  );
}
