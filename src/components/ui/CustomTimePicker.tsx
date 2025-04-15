'use client'
import { useEffect, useState } from "react";

const CustomTimePicker = ({ formik }) => {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    if (name === "hour") {
      setHour(value);
    } else if (name === "minute") {
      setMinute(value);
    }

    formik.setFieldValue("hora", `${name === "hour" ? value : hour}:${name === "minute" ? value : minute}`);
  };

  useEffect(() => {
    if (formik.isSubmitting && formik.isValid) {
      setHour("00");
      setMinute("00");
    }
  }, [formik.isSubmitting, formik.isValid]);

  return (
    <div className="flex gap-2 items-center">
        <span>Hora: </span>
      <select value={hour} onChange={handleTimeChange} name="hour" className="p-2 bg-slate-200 rounded">
        {[...Array(24).keys()].map((h) => (
          <option key={h} value={h.toString().padStart(2, "0")}>
            {h.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
        :
      <select value={minute} onChange={handleTimeChange} name="minute" className="p-2 bg-slate-200 rounded">
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default CustomTimePicker;
