import { getHojas } from "@/actions";
import { ButtonWithPath, Table } from "@/components";
import Link from "next/link";
import { BsFillInfoSquareFill } from "react-icons/bs";

function formatFecha(fecha: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(new Date(fecha));
}

export default async function DashboardPage() {
  const { hojas } = await getHojas();

  const columns = [
    { header: "#", key: "index" },
    { header: "Fecha", key: "fecha" },
    { header: "Supervisor", key: "supervisor" },
    { header: "Creador", key: "creador" },
    { header: "Acciones", key: "actions" },
  ];

  const data = hojas.map((hoja, index) => ({
    index: index + 1,
    fecha: formatFecha(hoja.fecha),
    supervisor: hoja.supervisor.nombre,
    creador: hoja.creador.nombre,
    actions: (
      <Link
        className="text-sky-600 hover:text-cyan-600 flex justify-center"
        href={`/hojas/${hoja.id}`}
      >
        <BsFillInfoSquareFill size={25} />
      </Link>
    ),
  }));

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <ButtonWithPath path="/hojas/new" title="Crear nuevo" />
      </div>
      <Table columns={columns} data={data} title="Hojas de ruta" />
    </div>
  );
}
