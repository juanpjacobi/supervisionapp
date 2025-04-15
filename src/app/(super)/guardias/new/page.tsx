import { GuardiaForm } from "@/components/guardias/GuardiaForm";

export default function NewGuardia() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear guardia</h1>
      <GuardiaForm />
    </div>
  );
}
