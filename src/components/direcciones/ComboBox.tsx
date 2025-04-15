"use client";

import { useEffect, useState } from "react";
import { getBarrios, getCiudades, getLocalidades } from "@/actions";
import Select from "react-select";

interface Props {
  formik: any;
}

export const ComboBoxDirecciones = ({ formik }: Props) => {
  const [ciudades, setCiudades] = useState<any[]>([]);
  const [localidades, setLocalidades] = useState<any[]>([]);
  const [barrios, setBarrios] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const ciudadesData = await getCiudades();
    const localidadesData = await getLocalidades();
    const barriosData = await getBarrios();
    const barriosOptions = barriosData.map((barrio) => ({
      value: barrio.id,
      label: barrio.nombreBarrio,
      localidadId: barrio.localidadId,
    }));

    const localidadesOptions = localidadesData.map((localidad) => ({
      value: localidad.id,
      label: localidad.nombreLocalidad,
      ciudadId: localidad.ciudadId,
    }));
    const ciudadesOptions = ciudadesData.map((ciudad) => ({
      value: ciudad.id,
      label: ciudad.nombreCiudad,
    }));
    setBarrios(barriosOptions);
    setLocalidades(localidadesOptions);
    setCiudades(ciudadesOptions);
  };
  const handleCiudadChange = (selectedOption: any) => {
    formik.setFieldValue(
      "ciudadId",
      selectedOption ? selectedOption.value : ""
    );
    formik.setFieldValue("localidadId", 0);
    formik.setFieldValue("barrioId", 0);
  };

  const handleLocalidadChange = (selectedOption: any) => {
    formik.setFieldValue(
      "localidadId",
      selectedOption ? selectedOption.value : ""
    );
    formik.setFieldValue("barrioId", 0);
  };

  const handleBarrioChange = (selectedOption: any) => {
    formik.setFieldValue(
      "barrioId",
      selectedOption ? selectedOption.value : 0
    );
  };

  const filteredLocalidades = localidades.filter(
    (l) => l.ciudadId === formik.values.ciudadId
  );
  const filteredBarrios = barrios.filter(
    (b) => b.localidadId === formik.values.localidadId
  );
  return (
    <div>
      {/* Ciudad */}
      <div className="flex flex-col mb-2">
        <span>Calle*</span>
        <input
          type="text"
          id="calle"
          name="calle"
          placeholder="Ingresa la calle"
          onChange={formik.handleChange}
          value={formik.values.calle}
          className="p-2 border rounded-md bg-gray-200"
        />
        {formik.errors.calle && (
          <span className="text-red-500 text-sm">{formik.errors.calle}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Número*</span>
        <input
          type="text"
          id="numero"
          name="numero"
          placeholder="Ingresa el numero"
          onChange={formik.handleChange}
          value={formik.values.numero}
          className="p-2 border rounded-md bg-gray-200"
        />
        {formik.errors.numero && (
          <span className="text-red-500 text-sm">{formik.errors.numero}</span>
        )}
      </div>
      <div className="flex flex-col mb-2">
        <label
          htmlFor="ciudadId"
          className="block text-sm font-medium text-gray-700"
        >
          Ciudad*
        </label>
        <Select
          id="ciudadId"
          instanceId="ciudadId"
          name="ciudadId"
          options={ciudades}
          onChange={handleCiudadChange}
          value={
            ciudades.find(
              (option) => option.value === formik.values.ciudadId
            ) || null
          }
          isClearable
          placeholder="Selecciona una ciudad"
          className="mt-2"
        />
        {formik.errors.ciudadId && (
          <span className="text-red-500 text-sm">{formik.errors.ciudadId}</span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <label
          htmlFor="localidadId"
          className="block text-sm font-medium text-gray-700"
        >
          Localidad*
        </label>
        <Select
          id="localidadId"
          instanceId="localidadId"

          name="localidadId"
          options={filteredLocalidades}
          onChange={handleLocalidadChange}
          value={
            filteredLocalidades.find(
              (option) => option.value === formik.values.localidadId
            ) || null
          }
          isClearable
          isDisabled={!formik.values.ciudadId}
          placeholder="Selecciona una localidad"
          className="mt-2"
        />
        {formik.errors.localidadId && (
          <span className="text-red-500 text-sm">
            {formik.errors.localidadId}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <label
          htmlFor="barrioId"
          className="block text-sm font-medium text-gray-700"
        >
          Barrio*
        </label>
        <Select
          id="barrioId"
          instanceId="barrioId"

          name="barrioId"
          options={filteredBarrios}
          onChange={handleBarrioChange}
          value={
            filteredBarrios.find(
              (option) => option.value === formik.values.barrioId
            ) || null
          }
          isClearable
          isDisabled={!formik.values.localidadId}
          placeholder="Selecciona un barrio"
          className="mt-2"
        />
        {formik.errors.barrioId && (
          <span className="text-red-500 text-sm">{formik.errors.barrioId}</span>
        )}
      </div>
    </div>
  );
};
