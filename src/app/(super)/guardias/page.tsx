import { getGuardias } from "@/actions";
import { ButtonWithPath, Table } from "@/components";
import Link from "next/link";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default async function GuardiasPage() {
  const { guardias } = await getGuardias();

  const columns = [
    { header: "#", key: "index" },
    { header: "Nombre", key: "nombre" },
    { header: "Numero", key: "numero" },
    { header: "Telefono", key: "telefono" },
    { header: "Estado", key: "estado" },

    { header: "Acciones", key: "actions" },
  ];

  const data = guardias.map((guardia, index) => ({
    index: index + 1,
    nombre: guardia.nombre,
    numero: guardia.numero,
    telefono: guardia.telefono,
    estado: guardia.activo ? "Activo" : "Inactivo",
    actions: (
      <Link
        className="text-sky-600 hover:text-cyan-600 flex justify-center"
        href={`/guardias/${guardia.id}`}
      >
        <BsFillInfoSquareFill size={25} />
      </Link>
    ),
  }));

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <ButtonWithPath path="/guardias/new" title="Crear nuevo" />
      </div>
      <Table columns={columns} data={data} title="Guardias" />
    </div>
  );
}
