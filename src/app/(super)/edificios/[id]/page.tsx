import { getEdificio } from "@/actions";
import { DetailCard, Table } from "@/components";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function EdificioPage({ params }: Props) {
  const { id } = params;
  const { edificio } = await getEdificio(Number.parseInt(id));

  if (!edificio) {
    return <div>Edificio no encontrado</div>;
  }

  const {
    nombre,
    administracion,
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
    DetalleEdificio,
  } = edificio;

  const addressDetails = [
    { label: "Calle", value: `${calle} ${numero}` },
    { label: "Barrio", value: nombreBarrio },
    { label: "Localidad", value: nombreLocalidad },
    { label: "Ciudad", value: nombreCiudad },
  ];

  const administracionDetails = {
    label: administracion.nombre,
    value: `${administracion.direccion.calle} ${administracion.direccion.numero}`,
  };

  const servicesDetails = DetalleEdificio?.services?.map(service => ({
    label: service.nombreService,
    value: `${service.descripcion} - Tel: ${service.telefono} - Email: ${service.email}`,
  }));

  const directivasDetails = DetalleEdificio?.directivas?.map((directiva, index) => ({
    label: `Directiva ${(index + 1 ).toString()}`,
    value: directiva.contenido, 
  }));

  const detalleDetails = [
    { label: "Modalidad del Servicio", value: DetalleEdificio?.modalidadServicio },
    { label: "Llaves", value: DetalleEdificio?.llaves },
    { label: "Baño", value: DetalleEdificio?.banio },
    { label: "Sótano", value: DetalleEdificio?.sotano },
    { label: "Tableros", value: DetalleEdificio?.tableros },
    { label: "Bombas", value: DetalleEdificio?.bombas },
    { label: "Sisterna", value: DetalleEdificio?.sisterna },
    { label: "Terraza", value: DetalleEdificio?.terraza },
    { label: "Cochera", value: DetalleEdificio?.cochera },
    { label: "Anotaciones", value: DetalleEdificio?.anotaciones },
    { label: "Alarma", value: DetalleEdificio?.alarma },
  ];

  return (
    <div className="container mx-auto md:p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{nombre}</h1>

      <DetailCard title="Dirección" details={addressDetails} />

      {/* Administración */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">Administración</h2>
        {administracion ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <Link href={`/administraciones/${administracion.id}`}>
              <p className="font-semibold text-gray-700">
                {administracionDetails.label}
              </p>
              <p className="text-gray-600">{administracionDetails.value}</p>
            </Link>
          </div>
        ) : (
          <p className="text-gray-600">No hay administraciones asociadas.</p>
        )}
      </div>

      {/* Detalles del Edificio */}
      {DetalleEdificio && (
        <DetailCard title="Detalles del Edificio" details={detalleDetails} />
      )}

      {/* Directivas */}
      {directivasDetails && directivasDetails.length > 0 && (
        <DetailCard title="Directivas" details={directivasDetails} />
      )}

      {/* Detalles del Servicio */}
      {servicesDetails && servicesDetails.length > 0 && (
        <DetailCard title="Servicios" details={servicesDetails} />
      )}
    </div>
  );
}
