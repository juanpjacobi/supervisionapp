import { getAdministraciones } from "@/actions";
import { EdificioForm } from "@/components";

export default async function NewEdificio() {

  const administraciones = await getAdministraciones();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear edificio</h1>
        <EdificioForm  administraciones={administraciones}/>
      </div>
  );
}