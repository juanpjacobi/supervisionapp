import { auth } from "@/auth.config";
import { AdministracionForm } from "@/components";

export default async function NewAdministracion() {

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear administración</h1>
      <AdministracionForm />
    </div>
  );
}