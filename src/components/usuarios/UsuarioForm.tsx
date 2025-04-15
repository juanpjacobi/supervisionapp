"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Rol } from "@prisma/client";
import { crearUsuario } from "@/actions";

interface UsuarioFormInput {
  nombre: string;
  email: string;
  password: string;
  rolId: number;

}

interface Props {
  roles: Rol[];
}

const initialState = {
    nombre : "",
    email : "",
    password : "",
    rolId: 0,
};

const usuarioSchema = Yup.object().shape({
  nombre: Yup.string().required("Requerido"),
  email: Yup.string().required("Requerido"),
  password: Yup.string().required("Requerido"),
  rolId: Yup.number().min(1, "Requerido").required("Requerido"),

});

export const UsuarioForm = ({ roles }: Props) => {
  const router = useRouter();

  const handleSubmit = async (data: UsuarioFormInput) => {
    const { ok, message } = await crearUsuario(data);

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
    router.replace("/usuarios/");
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: usuarioSchema,
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
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <span>Password*</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa el password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="p-2 border rounded-md bg-gray-200"
          />
          {formik.errors.password && (
            <span className="text-red-500 text-sm">{formik.errors.password}</span>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <span>Rol*</span>
          <select
            name="rolId"
            id="rolId"
            className="mt-2 w-full p-3 bg-gray-200 rounded-md"
            onChange={formik.handleChange}
            value={formik.values.rolId}
          >
            <option value="">Seleccione una opcion</option>

            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombreRol}</option>
            ))}
          </select>

          {formik.errors.rolId && (
            <span className="text-red-500 text-sm">
              {formik.errors.rolId}
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
