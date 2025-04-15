"use client";

import { crearAdministracion } from "@/actions";
import { useRouter } from "next/navigation";
import { ComboBoxDirecciones } from "../direcciones/ComboBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Administracion } from "@prisma/client";

interface AdministracionInputs {
  nombre: string;
  email: string;
  telefono: string;
  calle: string;
  numero: string;
    ciudadId: number,
  localidadId: number,
  barrioId: number; 
}

interface Props {
  administraciones: Administracion[]
}

const initialState = {
  nombre: '',
  email: '',
  telefono: '',
  calle: '',
  numero: '',
  ciudadId: 0,
  localidadId: 0,
  barrioId: 0
}

const administracionSchema =  Yup.object().shape({
  nombre: Yup.string().required('Requerido'),
  email: Yup.string().required('Requerido'),
  telefono: Yup.string().required('Requerido'),
  calle: Yup.string().required('Requerido'),
  numero: Yup.string().required('Requerido'),
  ciudadId: Yup.number().min(1, 'Requerido').required('Requerido'),
  localidadId: Yup.number().min(1, 'Requerido').required('Requerido'),
  barrioId: Yup.number().min(1, 'Requerido').required('Requerido'),
});


export const AdministracionForm = () => {
  const router = useRouter();

  const handleSubmit = async (data: AdministracionInputs) => {
    const { ok, message } = await crearAdministracion(data);

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
    };
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
    router.replace('/administraciones/');
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: administracionSchema,
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
            <span className="text-red-500 text-sm">
              {formik.errors.nombre}
            </span>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Email*</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa el email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.email && (
            <span className="text-red-500 text-sm">
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Teléfono*</span>
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
        <ComboBoxDirecciones formik={formik}/>
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="text-white bg-sky-600 px-4 py-3 rounded-md hover:bg-cyan-600">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};