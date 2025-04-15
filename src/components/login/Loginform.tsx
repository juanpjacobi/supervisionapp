"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const Loginform = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter()
  useEffect(() => {
    if (state === 'Success') {
      router.replace('/')
    }
  }, [state])
  
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="password"
        type="password"
      />

      <div
        className="flex mb-2 h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      ></div>
      {state === "CredentialsSignIn" && (
        <div className="mb-2 flex">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Credenciales incorrectas</p>
        </div>
      )}

      <LoginButton />
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
