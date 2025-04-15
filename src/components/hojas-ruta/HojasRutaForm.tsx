"use client";

import { crearGuardia, crearHojaDeRuta } from "@/actions";
import { useRouter } from "next/navigation";
import { ComboBoxDirecciones } from "../direcciones/ComboBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

interface HojaformInputs {
  fecha: string;
  supervisorId: number;
  creadorId: number;
}

const initialState = {
  fecha: "",
  supervisorId: 0,
  creadorId: 0,
};



const hojaSchema = Yup.object().shape({
    fecha: Yup.date()
      .required("La fecha es obligatoria")
      .nullable(),  // Permite un valor nulo si no se selecciona una fecha
    supervisorId: Yup.number().min(1, "Requerido").required("Requerido"),
    creadorId: Yup.number().min(1, "Requerido").required("Requerido"),
  });
  
  



export const HojaRutaForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: HojaformInputs) => {
    const [day, month, year] = data.fecha.split("/");
    const formattedDate = new Date(`${year}-${month}-${day}`);

    const { ok, message } = await crearHojaDeRuta({
      ...data,
      fecha: formattedDate,
    });

    if (!ok) {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.replace("/dashboard/");
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: hojaSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col justify-center bg-white p-5 rounded-md items-center">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="text-gray-700 text-sm text-center">
          <span>Los campos marcados con * son obligatorios</span>
        </div>
        <div className="flex flex-col mb-2">
          <span>Fecha*</span>
          
          <input
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Ingresa el fecha"
            onChange={formik.handleChange}
            value={formik.values.fecha}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.fecha && (
            <span className="text-red-500 text-sm">{formik.errors.fecha}</span>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <span>Creador*</span>
          <input
            type="number"
            id="creadorId"
            name="creadorId"
            placeholder="Ingresa el creadorId"
            onChange={formik.handleChange}
            value={formik.values.creadorId}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.creadorId && (
            <span className="text-red-500 text-sm">
              {formik.errors.creadorId}
            </span>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <span>Supervisor*</span>
          <input
            type="number"
            id="supervisorId"
            name="supervisorId"
            placeholder="Ingresa el supervisorId"
            onChange={formik.handleChange}
            value={formik.values.supervisorId}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.supervisorId && (
            <span className="text-red-500 text-sm">
              {formik.errors.supervisorId}
            </span>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="text-white bg-sky-600 px-4 py-3 rounded-md hover:bg-cyan-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
