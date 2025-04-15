"use client";

import { crearGuardia } from "@/actions";
import { useRouter } from "next/navigation";
import { ComboBoxDirecciones } from "../direcciones/ComboBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

interface GuardiaFormInputs {
  nombre: string;
  apellido: string;
  telefono: string;
  dni: string;
  calle: string;
  numero: string;
  ciudadId: number;
  localidadId: number;
  barrioId: number;
}

const initialState = {
  nombre: "",
  apellido: "",
  telefono: "",
  dni: "",
  calle: "",
  numero: "",
  ciudadId: 0,
  localidadId: 0,
  barrioId: 0,
};

const guardiaSchema = Yup.object().shape({
  nombre: Yup.string().required("Requerido"),
  apellido: Yup.string().required("Requerido"),
  telefono: Yup.string().required("Requerido"),
  dni: Yup.string().required("Requerido"),
  calle: Yup.string().required("Requerido"),
  numero: Yup.string().required("Requerido"),
  ciudadId: Yup.number().min(1, "Requerido").required("Requerido"),
  localidadId: Yup.number().min(1, "Requerido").required("Requerido"),
  barrioId: Yup.number().min(1, "Requerido").required("Requerido"),
});

export const GuardiaForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: GuardiaFormInputs) => {
    const { ok, message } = await crearGuardia(data);
    console.log({data, ok, message})

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
    router.replace("/guardias/");
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: guardiaSchema,
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
          <span>Apellido*</span>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Ingresa el apellido"
            onChange={formik.handleChange}
            value={formik.values.apellido}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.apellido && (
            <span className="text-red-500 text-sm">
              {formik.errors.apellido}
            </span>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <span>Telefono*</span>
          <input
            type="text"
            id="telefono"
            name="telefono"
            placeholder="Ingresa el telefono"
            onChange={formik.handleChange}
            value={formik.values.telefono}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.telefono && (
            <span className="text-red-500 text-sm">
              {formik.errors.telefono}
            </span>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <span>Dni*</span>
          <input
            type="text"
            id="dni"
            name="dni"
            placeholder="Ingresa el dni"
            onChange={formik.handleChange}
            value={formik.values.dni}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.dni && (
            <span className="text-red-500 text-sm">{formik.errors.dni}</span>
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
