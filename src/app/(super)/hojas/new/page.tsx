import { HojaRutaForm } from "@/components/hojas-ruta/HojasRutaForm";

export default function NewHojaRuta() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear hoja de ruta</h1>
      <HojaRutaForm />
    </div>
  );
}