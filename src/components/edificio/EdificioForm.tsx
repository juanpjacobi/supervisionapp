"use client";

import { crearEdificio } from "@/actions";
import { useRouter } from "next/navigation";
import { ComboBoxDirecciones } from "../direcciones/ComboBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Administracion } from "@prisma/client";

interface EdificioFormInputs {
  nombre: string;
  calle: string;
  numero: string;
  ciudadId: number;
  localidadId: number;
  barrioId: number;
  administracionId: number;
}

interface Props {
  administraciones: Administracion[];
}

const initialState = {
  nombre: "",
  calle: "",
  numero: "",
  ciudadId: 0,
  localidadId: 0,
  barrioId: 0,
  administracionId: 0,
};

const edficioSchema = Yup.object().shape({
  nombre: Yup.string().required("Requerido"),
  calle: Yup.string().required("Requerido"),
  numero: Yup.string().required("Requerido"),
  ciudadId: Yup.number().min(1, "Requerido").required("Requerido"),
  localidadId: Yup.number().min(1, "Requerido").required("Requerido"),
  barrioId: Yup.number().min(1, "Requerido").required("Requerido"),
  administracionId: Yup.number().min(1, "Requerido").required("Requerido"),
});

export const EdificioForm = ({ administraciones }: Props) => {
  const router = useRouter();

  const handleSubmit = async (data: EdificioFormInputs) => {
    const { ok, message } = await crearEdificio(data);

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
    router.replace("/edificios/");
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: edficioSchema,
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
          <span>Nombre*</span>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingresa el nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.nombre && (
            <span className="text-red-500 text-sm">{formik.errors.nombre}</span>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Administracion*</span>
          <select
            name="administracionId"
            id="administracionId"
            className="mt-2 w-full p-3 bg-gray-200"
            onChange={formik.handleChange}
            value={formik.values.administracionId}
          >
            <option value="">Seleccione una opcion</option>

            {administraciones.map((administracion) => (
              <option key={administracion.id} value={administracion.id}>{administracion.nombre}</option>
            ))}
          </select>

          {formik.errors.administracionId && (
            <span className="text-red-500 text-sm">
              {formik.errors.administracionId}
            </span>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <ComboBoxDirecciones formik={formik} />
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
