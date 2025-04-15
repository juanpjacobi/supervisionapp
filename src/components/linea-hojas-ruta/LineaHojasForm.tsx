"use client";

import { crearLineahojaruta } from "@/actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  Edificio,
  Guardia,
  Prioridad,
  TipoLineaHojaRuta,
} from "@prisma/client";
import CustomTimePicker from "../ui/CustomTimePicker";

interface LineaHojaInputs {
  descripcion: string;
  hojaRutaId: number;
  tipoId: number;
  prioridadId: number;
  edificioId: number;
  guardiaId: number;
  hora: string;
}

const initialState = {
  descripcion: "",
  hojaRutaId: 0,
  tipoId: 0,
  prioridadId: 0,
  edificioId: 0,
  guardiaId: 0,
  hora: "0"
};

const hojaSchema = Yup.object().shape({
  descripcion: Yup.string().required("Requerido"),
  tipoId: Yup.number().min(1, "Requerido").required("Requerido"),
  prioridadId: Yup.number().min(1, "Requerido").required("Requerido"),
  edificioId: Yup.number().min(1, "Requerido").required("Requerido"),
  guardiaId: Yup.number().min(1, "Requerido").required("Requerido"),
});

interface LineasHojaFormProps {
  tipos: TipoLineaHojaRuta[];
  prioridades: Prioridad[];
  edificios: Edificio[];
  guardias: Guardia[];
  hojaRutaId: number;
}

export const LineaHojaRutaForm = ({
  edificios,
  guardias,
  prioridades,
  tipos,
  hojaRutaId,
}: LineasHojaFormProps) => {
  const guardiasOptions = guardias.map((guardia) => ({
    value: guardia.id,
    label: guardia.nombre,
  }));
  const edificiosOptions = edificios.map((edificio) => ({
    value: edificio.id,
    label: edificio.nombre,
  }));

  const handleSubmit = async (data: LineaHojaInputs) => {
    data.hojaRutaId = hojaRutaId;
    data.tipoId = Number(data.tipoId);
    data.prioridadId = Number(data.prioridadId);

    const { ok, message } = await crearLineahojaruta(data);

    formik.resetForm();
    
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
          <span className="mb-2 text-slate-700">Descripcion*</span>

          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Ingresa el descripcion"
            onChange={formik.handleChange}
            value={formik.values.descripcion}
            className="p-2 min-h-12 max-h-32 border rounded-md bg-gray-200"
          />
          {formik.errors.descripcion && (
            <span className="text-red-500 text-sm">
              {formik.errors.descripcion}
            </span>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <CustomTimePicker formik={formik}/>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="flex flex-col mb-2">
            <span className="mb-2 text-slate-700">Tipo*</span>
            <select
              name="tipoId"
              id="tipoId"
              className="mt-2 p-2 bg-white border rounded text-slate-600"
              onChange={formik.handleChange}
              value={formik.values.tipoId}
            >
              <option value="">Seleccione una opcion</option>

              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>

            {formik.errors.tipoId && (
              <span className="text-red-500 text-sm">
                {formik.errors.tipoId}
              </span>
            )}
          </div>

          <div className="flex flex-col mb-2">
            <span className="mb-2 text-slate-700">Prioridad*</span>
            <select
              name="prioridadId"
              id="prioridadId"
              className="mt-2 p-2 bg-white border rounded text-slate-600"
              onChange={formik.handleChange}
              value={formik.values.prioridadId}
            >
              <option value="">Seleccione una opcion</option>

              {prioridades.map((prioridad) => (
                <option key={prioridad.id} value={prioridad.id}>
                  {prioridad.nombre}
                </option>
              ))}
            </select>

            {formik.errors.prioridadId && (
              <span className="text-red-500 text-sm">
                {formik.errors.prioridadId}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <span className="mb-2 text-slate-700">Guardia*</span>
            <Select
              id="guardiaId"
              name="guardiaId"
              instanceId="guardiaId"
              options={guardiasOptions}
              onChange={(selectedOption) => {
                formik.setFieldValue(
                  "guardiaId",
                  selectedOption ? selectedOption.value : 0
                );
              }}
              value={
                guardiasOptions.find(
                  (option) => option.value === formik.values.guardiaId
                ) || null
              }
              isClearable
              placeholder="Selecciona un guardia"
              className="mt-2 text-slate-700"
            />
            {formik.errors.guardiaId && (
              <span className="text-red-500 text-sm">
                {formik.errors.guardiaId}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <span className="mb-2 text-slate-700">Edificio*</span>
            <Select
              id="edificioId"
              name="edificioId"
              instanceId="edificioId"
              options={edificiosOptions}
              onChange={(selectedOption) => {
                formik.setFieldValue(
                  "edificioId",
                  selectedOption ? selectedOption.value : 0
                );
              }}
              value={
                edificiosOptions.find(
                  (option) => option.value === formik.values.edificioId
                ) || null
              }
              isClearable
              placeholder="Selecciona un edificio"
              className="mt-2"
            />
            {formik.errors.edificioId && (
              <span className="text-red-500 text-sm">
                {formik.errors.edificioId}
              </span>
            )}
          </div>
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
