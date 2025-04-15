import {
  getEdificios,
  getGuardias,
  getHoja,
  getPriorirades,
  getTareasPeriodicas,
  getTiposLineasHojaruta,
} from "@/actions";
import { auth } from "@/auth.config";
import { DetailCard, LineaHojaRutaForm } from "@/components";
import { NovedadesForm } from "@/components/hojas-ruta/NovedadesForm";
import { CheckLineaHandler } from "@/components/linea-hojas-ruta/CheckLineaHandler";
import { formatDate } from "@/helpers";

interface Props {
  params: {
    id: string;
  };
}

export default async function HojaRutaPage({ params }: Props) {
  const session = await auth();
  const { id } = params;
  const { hoja } = await getHoja(Number.parseInt(id));
  const {periodicas} = await getTareasPeriodicas();
  const { tipos } = await getTiposLineasHojaruta();
  const { prioridades } = await getPriorirades();
  const { edificios } = await getEdificios();
  const { guardias } = await getGuardias();

  if (!hoja) {
    return <div>Hoja no encontrada</div>;
  }

  const { fecha, supervisor, creador, LineaHojaRuta, Novedad } = hoja;

  const hojaDetails = [
    { label: "Fecha", value: formatDate(fecha) },
    { label: "Supervisor de turno", value: supervisor.nombre },
    { label: "Creador hoja de ruta", value: creador.nombre },
  ];

  const lineaDetails = LineaHojaRuta.map((linea: any) => ({
    id: linea.id,
    descripcion: linea.descripcion,
    tipo: linea.tipo.nombre,
    hora: linea.hora,
    prioridad: linea.prioridad.nombre,
    edificio: linea.edificio.nombre,
    guardia: linea.guardia.nombre,
    completada: linea.completada,
  }));

  const periodicasDetails = periodicas.map((semanal: any) => ({
    id: semanal.id,
    descripcion: semanal.descripcion,
    tipo: semanal.tipo.nombre,
    edificio: semanal.edificio.nombre,
    guardia: semanal.guardia.nombre,
  }));

  const novedadDetails = Novedad.map((novedad: any) => ({
    id: novedad.id,
    descripcion: novedad.descripcion,
    hora: novedad.hora,
    edificio: novedad.edificio.nombre,
    guardia: novedad.guardia.nombre,
  }));
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Hoja de ruta {formatDate(fecha)}
      </h1>

      <DetailCard title="Información de hoja de ruta" details={hojaDetails} />

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Tareas a realizar
        </h2>
        {LineaHojaRuta.length > 0 ? (
          <div className="space-y-2 flex flex-col">
            {lineaDetails.map((linea, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700 break-all">
                  Descripcion: {linea.descripcion}
                </p>
                <p className="font-semibold text-gray-700">
                  Hora: {linea.hora}
                </p>
                <p className="font-semibold text-gray-700">
                  Tipo: {linea.tipo}
                </p>
                <p className="font-semibold text-gray-700">
                  Prioridad: {linea.prioridad}
                </p>
                <p className="font-semibold text-gray-700">
                  Edificio: {linea.edificio}
                </p>
                <p className="font-semibold text-gray-700">
                  Guardia: {linea.guardia}
                </p>
                <CheckLineaHandler linea={linea} hojaId={Number(id)} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-gray-600">No hay tareas asociadas.</p>
          </>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Tareas periodicas
        </h2>
        {periodicas.length > 0 ? (
          <div className="space-y-2 flex flex-col">
            {periodicasDetails.map((periodica, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700 break-all">
                  Descripcion: {periodica.descripcion}
                </p>

                <p className="font-semibold text-gray-700">
                  Tipo: {periodica.tipo}
                </p>

                <p className="font-semibold text-gray-700">
                  Edificio: {periodica.edificio}
                </p>
                <p className="font-semibold text-gray-700">
                  Guardia: {periodica.guardia}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-gray-600">No hay novedades asociadas.</p>
          </>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Novedades registradas
        </h2>
        {Novedad.length > 0 ? (
          <div className="space-y-2 flex flex-col">
            {novedadDetails.map((novedad, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700 break-all">
                  Descripcion: {novedad.descripcion}
                </p>
                <p className="font-semibold text-gray-700">
                  Hora: {novedad.hora}
                </p>
                <p className="font-semibold text-gray-700">
                  Edificio: {novedad.edificio}
                </p>
                <p className="font-semibold text-gray-700">
                  Guardia: {novedad.guardia}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-gray-600">No hay novedades asociadas.</p>
          </>
        )}
      </div>
      {(session.user.rol.nombreRol === "Admin" ||
        session.user.rol.nombreRol === "Root") && (
        <LineaHojaRutaForm
          edificios={edificios}
          guardias={guardias}
          prioridades={prioridades}
          tipos={tipos}
          hojaRutaId={Number(id)}
        />
      )}
      {session.user.rol.nombreRol === "Supervisor" && (
        <NovedadesForm
          hojaRutaId={Number(id)}
          edificios={edificios}
          guardias={guardias}
        />
      )}
    </div>
  );
}
