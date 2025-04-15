import { getGuardia } from "@/actions";
import { DetailCard } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function GuardiaPage({ params }: Props) {
  const { id } = params;

  const { guardia } = await getGuardia(Number.parseInt(id));
  if (!guardia) {
    return <div>Guardia no encontrado</div>;
  }

  const {
    nombre,
    apellido,
    dni,
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
  } = guardia;

  const personalDetails = [
    { label: "Nombre", value: nombre },
    { label: "Apellido", value: apellido },
    { label: "Dni", value: dni },
  ];
  const contactDetails = [{ label: "Teléfono", value: telefono }];

  const addressDetails = [
    { label: "Calle", value: `${calle} ${numero}` },
    { label: "Barrio", value: nombreBarrio },
    { label: "Localidad", value: nombreLocalidad },
    { label: "Ciudad", value: nombreCiudad },
  ];
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{nombre}</h1>

      {/* Información personal */}
      <DetailCard title="Información personal" details={personalDetails} />

      {/* Información de contacto */}
      <DetailCard title="Información de contacto" details={contactDetails} />

      {/* Dirección */}
      <DetailCard title="Dirección" details={addressDetails} />
    </div>
  );
}
