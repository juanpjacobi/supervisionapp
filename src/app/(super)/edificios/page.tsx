import { getEdificios } from "@/actions";
import { ButtonWithPath, Table } from "@/components";
import Link from "next/link";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default async function EdificiosPage() {
  const { edificios } = await getEdificios();
  const columns = [
    { header: "#", key: "index" },
    { header: "Nombre", key: "nombre" },
    { header: "Estado", key: "estado" },
    { header: "Acciones", key: "actions" },
  ];

  const data = edificios.map((edificio, index) => ({
    index: index + 1,
    nombre: edificio.nombre,
    estado: edificio.activo ? "Activo" : "Inactivo",
    actions: (
      <Link
        className="text-sky-600 hover:text-cyan-600 flex justify-center"
        href={`/edificios/${edificio.id}`}
      >
        <BsFillInfoSquareFill size={25} />
      </Link>
    ),
  }));
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <ButtonWithPath path="/edificios/new" title="Crear nuevo" />
      </div>
      <Table columns={columns} data={data} title="Edificios" />
    </div>
  );
}
