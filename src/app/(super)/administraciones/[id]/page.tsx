import { getAdministracion } from "@/actions";
import { DetailCard } from "@/components";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function AdministracionPage({ params }: Props) {
  const { id } = params;
  const { administracion } = await getAdministracion(Number.parseInt(id));

  if (!administracion) {
    return <div>Administración no encontrada</div>;
  }

  const {
    nombre,
    email,
    telefono,
    direccion: {
      calle,
      numero,
      barrio: {
        nombreBarrio,
        localidad: {
          nombreLocalidad,
          ciudad: { nombreCiudad },
        },
      },
    },
    Edificio,
  } = administracion;

  const contactDetails = [
    { label: "Email", value: email },
    { label: "Teléfono", value: telefono },
  ];

  const addressDetails = [
    { label: "Calle", value: `${calle} ${numero}` },
    { label: "Barrio", value: nombreBarrio },
    { label: "Localidad", value: nombreLocalidad },
    { label: "Ciudad", value: nombreCiudad },
  ];

  const buildingDetails = Edificio.map((edificio: any) => ({
    id: edificio.id,
    label: edificio.nombre,
    value: `${edificio.direccion.calle} ${edificio.direccion.numero}`,
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{nombre}</h1>

      {/* Información de contacto */}
      <DetailCard title="Información de contacto" details={contactDetails} />

      {/* Dirección */}
      <DetailCard title="Dirección" details={addressDetails} />

      {/* Edificios Asociados */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Edificios Asociados
        </h2>
        {Edificio.length > 0 ? (
          <ul className="space-y-2">
            {buildingDetails.map((building, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <Link href={`/edificios/${building.id}`}>
                  <p className="font-semibold text-gray-700">
                    {building.label}
                  </p>
                  <p className="text-gray-600">{building.value}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No hay edificios asociados.</p>
        )}
      </div>
    </div>
  );
}
